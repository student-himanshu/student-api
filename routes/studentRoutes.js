const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management APIs
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 */

const validate = require("../middleware/validate");
const studentSchema = require("../validators/studentValidator");
const { getStudents, getStudentById, addStudent, updateStudent, deleteStudent, getProfile, uploadProfilePhoto } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
    "/profile-photo",
    authMiddleware,
    upload.single("photo"),
    uploadProfilePhoto
);

router.delete(
    "/students/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteStudent
);

router.put(
    "/students/:id",
    authMiddleware,
    authorizeRoles("teacher", "admin"),
    validate(studentSchema),
    updateStudent
);

router.get(
    "/profile",
    authMiddleware,
    authorizeRoles("student", "teacher", "admin"),
    getProfile
);

router.get("/", authMiddleware, getStudents);
router.get("/:id", getStudentById);
router.post("/", validate(studentSchema), addStudent);
router.put("/:id", validate(studentSchema), updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
