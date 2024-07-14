import express from "express";
import * as UC from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/signup").post(UC.signUp)
router.route("/signin").get(UC.signIn)

export default router