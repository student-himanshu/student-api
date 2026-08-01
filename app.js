const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    // res.send("Welcome to Student API");
    res.json({
    name: "Himanshu",
    age: 22
});
// res.json("hellow world")  ;  

});
app.get("/about", (req, res) => {
    res.send("About Page");
});
app.get("/content",(req,res)=>{
    res.send("content page");
})
app.get("/students", (req, res) => {

  const students = [

    {
        id:1,
        name:"Rahul",
        age:20
    },

    {
        id:2,
        name:"Aman",
        age:21
    },

    {
        id:3,
        name:"Riya",
        age:22
    },
    {
        id:4,
        name:"jay",
        age:23
    }

];

res.json(students);

});
app.get("/teachers", (req, res) => {
    res.send("All Teachers");
});
app.get("/login",(req,res)=>{
    res.send("login page");

})
app.get("/signup",(req,res)=>{
    res.send("signup");
})
app.get("/profile",(req,res)=>{
    res.send("profile");
})
app.get("/courses",(req,res)=>{
    res.send("courses");
})
app.get("/results",(req,res)=>{
    res.send("results");
})
app.get("/", (req, res) => {

});
// app.res("welcome")
app.listen(3000, () => {
    console.log("Server Started");
});

