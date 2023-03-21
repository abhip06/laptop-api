import express from "express";
import { login, logout, myProfile, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/my-profile").get(isAuthenticated, myProfile);

export default router;