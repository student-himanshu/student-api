const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Student API");
});
app.get("/about", (req, res) => {
    res.send("About Page");
});
app.get("/content",(req,res)=>{
    res.send("content page");
})
app.get("/students", (req, res) => {
    res.send("All Students");
});
app.get("/teachers", (req, res) => {
    res.send("All Teachers");
});

app.listen(3000, () => {
    console.log("Server Started");
});
