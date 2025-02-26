import categoryModel from "../db/models/category.js";
import asyncHandler from "../error/asyncHandelr.js";
import { appError } from "../error/classError.js";

export const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.user;
  const exists = await categoryModel.findOne({ name, ownerId: _id });
  if (exists) {
    next(new appError("this category already exists in your categories", 400));
  }
  const category = await categoryModel.create({ name, ownerId: _id });
  if (!category) {
    next(new appError("something went wrong, try again", 400));
  }
  res.status(200).json({ msg: "done", category });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const categories = await categoryModel.find({ ownerId: _id });
  if (!categories) {
    next(new appError("there is no categories", 404));
  }
  res.status(200).json({ msg: "done", categories });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { oldName, newName } = req.body;
  const { _id } = req.user;
  const exists = await categoryModel.findOne({ name: newName, ownerId: _id });
  if (exists) {
    next(
      new appError(
        "you can't update name to this new name cause there is another category with the same name",
        400
      )
    );
  }
  const category = await categoryModel.findOneAndUpdate(
    { name: oldName, ownerId: _id },
    { name: newName },
    { new: true }
  );
  if (!category) {
    next(new appError("no category with this name", 404));
  }
  res.status(200).json({ msg: "done", category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.user;
  const category = await categoryModel.findOneAndDelete({ name, ownerId: _id });
  if (!category) {
    next(new appError("no category with this name", 404));
  }
  res.status(204).json({ msg: "done" });
});
