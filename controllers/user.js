import jwt from "jsonwebtoken";
import userModel from "../db/models/user.js";
import asyncHandler from "../error/asyncHandelr.js";
import { appError } from "../error/classError.js";

export const signUp = asyncHandler(async (req, res, next) =>{
    const {name, email, password} = req.body;
      const exists = await userModel.findOne({ email });
      if (exists) {
        next(new appError("email already exists", 400));
      }
      await userModel.create({name, email, password});
      res.status(200).json({ msg: "done" });
})

export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
      next(new appError("email or password or mobile number is wrong", 400));
    }
    const token = jwt.sign({ username: user.name, password }, "signedIn");
    res.status(200).json({ msg: "done", user, token });
  });

