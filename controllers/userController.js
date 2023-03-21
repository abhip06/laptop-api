import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

// Register User
export const register = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) return next(new ErrorHandler("Please enter all fields.", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exist.", 400));

    user = await User.create({
        name,
        email,
        password,
    });

    sendToken(res, user, "You have registered successfully.", 201);
});

// Login User
export const login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please enter all fields.", 400));

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password.", 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return next(new ErrorHandler("Invalid email or password.", 401));

    sendToken(res, user, "Login successfull", 200);
});

// Logout User
export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged out successfully.",
    });
});

// Get Profile of current User
export const myProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});
