const Student = require("../models/studentModel");
//          GET ALL
const getStudents = async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

//          GET BY ID
const getStudentById = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({

                message: "Student Not Found"

            });

        }

        res.json(student);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

//               POST
const addStudent = async (req, res) => {

    try {

        const student = await Student.create({

            name: req.body.name,

            age: req.body.age

        });

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

//              PUT
const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!student) {

            return res.status(404).json({

                message: "Student Not Found"

            });

        }

        res.json(student);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

//           DELETE
const deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {

            return res.status(404).json({

                message: "Student Not Found"

            });

        }

        res.json({

            message: "Student Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {

    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent

};