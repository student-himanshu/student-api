const express = require("express");

const router = express.Router();
const validateStudent = require("../middleware/validateStudent");
const {

    getStudents, getStudentById, addStudent, updateStudent, deleteStudent

} = require("../controllers/studentController");

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", validateStudent, addStudent);

router.put("/:id", validateStudent, updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;