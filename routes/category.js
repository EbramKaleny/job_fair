import express from "express";
import * as CC from "../controllers/category.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/add").post(auth(),CC.addCategory)
router.route("/get").get(auth(),CC.getCategory)
router.route("/update").put(auth(),CC.updateCategory)
router.route("/delete").delete(auth(),CC.deleteCategory)

export default router