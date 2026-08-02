const students = require("../models/studentModel");

const getStudents = (req, res) => {

    res.json(students);

};

module.exports = {

    getStudents

};