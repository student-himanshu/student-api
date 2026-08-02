const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.listen(3000, () => {

    console.log("Server Started");

});