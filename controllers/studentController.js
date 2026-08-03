const Student = require("../models/studentModel");
const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");

const getProfile = asyncHandler(async (req, res) => {

    sendSuccess(res, 200, "Profile fetched successfully", { user: req.user });

});

const uploadProfilePhoto = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "No photo uploaded");
    }

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { profilePhoto: req.file.filename },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    sendSuccess(res, 200, "Profile photo uploaded successfully", {
        profilePhoto: user.profilePhoto
    });

});

const getStudents = asyncHandler(async (req, res) => {

    const students = await Student.find();
    sendSuccess(res, 200, "Students fetched successfully", students);

});

const getStudentById = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        throw new ApiError(404, "Student Not Found");
    }

    sendSuccess(res, 200, "Student fetched successfully", student);

});

const addStudent = asyncHandler(async (req, res) => {

    const student = await Student.create({
        name: req.body.name,
        age: req.body.age
    });

    sendSuccess(res, 201, "Student created successfully", student);

});

const updateStudent = asyncHandler(async (req, res) => {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!student) {
        throw new ApiError(404, "Student Not Found");
    }

    sendSuccess(res, 200, "Student updated successfully", student);

});

const deleteStudent = asyncHandler(async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        throw new ApiError(404, "Student Not Found");
    }

    sendSuccess(res, 200, "Student Deleted Successfully");

});

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    getProfile,
    uploadProfilePhoto
};
