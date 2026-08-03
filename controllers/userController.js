const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const sendEmail = require("../utils/sendEmail");

const signup = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "student"
    });

    sendSuccess(res, 201, "User Registered Successfully", {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });

});

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid Password");
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    sendSuccess(res, 200, "Login Successful", { token });

});

const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //yeh sirf otp console print ke liye hai
    console.log("================================");
    console.log("Email :", email);
    console.log("OTP   :", otp);
    console.log("================================");

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    sendSuccess(res, 200, "OTP sent to email");

});

const resetPassword = asyncHandler(async (req, res) => {

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (Date.now() > user.otpExpiry) {
        throw new ApiError(400, "OTP Expired");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    sendSuccess(res, 200, "Password Reset Successfully");

});

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword
};
