import express from "express";
import * as TC from "../controllers/task.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/add/:categoryName").post(auth(),TC.addTask)
router.route("/getMyTasks").get(auth(),TC.getMyTask)
router.route("/getAllTasks").get(auth(),TC.getAllTask)
router.route("/update/:oldTitle").put(auth(),TC.updateTask)
router.route("/delete").delete(auth(),TC.deleteTask)

export default router