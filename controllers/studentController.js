const students = require("../models/studentModel");

//          GET ALL
const getStudents = (req, res) => {

    res.status(200).json(students);

};

//          GET BY ID
const getStudentById = (req, res) => {

    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    res.json(student);

};

//               POST
const addStudent = (req, res) => {

    const newStudent = {

        id: students.length + 1,

        name: req.body.name,

        age: req.body.age

    };

    students.push(newStudent);

    res.status(201).json(newStudent);

};

//              PUT
const updateStudent = (req, res) => {

    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    student.name = req.body.name;

    student.age = req.body.age;

    res.json({

        message: "Updated Successfully",

        student

    });

};

//           DELETE
const deleteStudent = (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {

        return res.status(404).json({

            message: "Student Not Found"

        });

    }

    students.splice(index, 1);

    res.json({

        message: "Deleted Successfully"

    });

};
module.exports = {

    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent

};