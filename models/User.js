import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your namr"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        minLength: [8, "Password must be at least 8 characters"],
        required: [true, "Please enter your password"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    // watchlist: [
    //     {
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "products",
    //         },
    //     },
    // ],

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("users", userSchema);