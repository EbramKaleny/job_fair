import taskModel from "../db/models/task.js";
import asyncHandler from "../error/asyncHandelr.js";
import { appError } from "../error/classError.js";
import categoryModel from "../db/models/category.js";

export const addTask = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.params;
  const { _id } = req.user;
  const category = await categoryModel.findOne({
    name: categoryName,
    ownerId: _id,
  });
  if (!category) {
    next(new appError("there is no category with this name", 404));
  }
  req.body.categoryId = category._id;
  const task = await taskModel.create(req.body);
  if (!task) {
    next(new appError("something went wrong, try again", 400));
  }
  res.status(200).json({ msg: "done", task });
});

export const getMyTask = asyncHandler(async (req, res, next) => {
  const { categoryName, shared, sortBy, order } = req.query;
  const { _id } = req.user;
  let query = {};
  if (shared) {
    query.shared = true;
  }
  let categoryIds;
  if (categoryName) {
    const category = await categoryModel.findOne({
      name: categoryName,
      ownerId: _id,
    });
    if (category) {
      categoryIds = category._id;
    } else {
      next(new appError("category not found", 404));
    }
  } else {
    const categories = await categoryModel.find({ ownerId: _id }).select("_id");
    if (categories.length == 0) {
      next(new appError("you have no categories", 404));
    }
    categories.map((category) => category._id);
  }
  console.log(categoryIds);
  let sortOptions = {}
  if(sortBy === "categoryName"){
    sortOptions["category.name"] = order === "desc" ? -1 : 1
  }
  const tasks = await taskModel.find({
    $or: [{ categoryId: { $in: categoryIds } }, query],
  }).populate("category").sort(sortOptions);
  if (tasks.length == 0) {
    next(new appError("you have no tasks", 404));
  }
  res.status(200).json({ msg: "done", tasks });
});

export const getAllTask = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ shared: true });
  if (!tasks) {
    next(new appError("there is no tasks yet", 404));
  }
  res.status(200).json({ msg: "done", tasks });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { oldTitle } = req.params;
  const { _id } = req.user;
  const categories = await categoryModel.find({ ownerId: _id }).select("_id");
  if (categories.length == 0) {
    next(new appError("you have no categories", 404));
  }
  const categoryIds = categories.map((category) => category._id);
  const task = await taskModel.findOneAndUpdate(
    { title: oldTitle, categoryId: { $in: categoryIds } },
    req.body,
    { new: true }
  );
  if (!task) {
    next(new appError("there is no task with this title", 404));
  }
  res.status(200).json({ msg: "done", task });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  const { _id } = req.user;
  const categories = await categoryModel.find({ ownerId: _id }).select("_id");
  if (categories.length == 0) {
    next(new appError("you have no categories", 404));
  }
  const categoryIds = categories.map((category) => category._id);
  const task = await taskModel.findOneAndDelete({
    title,
    categoryId: { $in: categoryIds },
  });
  if (!task) {
    next(new appError("there is no task with this title", 404));
  }
  res.status(204).json({ msg: "done" });
});
