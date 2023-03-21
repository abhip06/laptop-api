import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("You are not Logged in.", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded._id);

    next();
});