const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;





// const students = [
//     {
//         id: 1,
//         name: "Rahul",
//         age: 20
//     },
//     {
//         id: 2,
//         name: "Aman",
//         age: 21
//     },
//     {
//         id: 3,
//         name: "Riya",
//         age: 22
//     }
// ];

// module.exports = students;
