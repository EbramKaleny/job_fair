import userModel from "../db/models/user.js";
import jwt from "jsonwebtoken";
import { appError } from "../error/classError.js";

export const auth = () => {
  return async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
          next(new appError("invalid token", 400));
        }
        if (!token.startsWith("ebram_")) {
          next(new appError("invalid token",400));
        }
        const newToken = token.split("ebram_")[1]
        if(!newToken){
            next(new appError("invalid token", 400))
        }
        const decoded = jwt.verify(newToken, "signedIn");
        if(!decoded?.username || !decoded?.password){
            next(new appError("invalid token", 400))
        }
        const user = await userModel.findOne({ name: decoded.username, password: decoded.password });
        if (!user) {
          next(new appError("user not found", 404));
        }
        req.user = user;
        next();
    } catch (error) {
        next(new appError("catched error in auth", 400))
    }
  };
};
