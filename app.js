const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express();

connectDB();
app.use(express.json());
app.use("/users", userRoutes);

app.use("/students", studentRoutes);//jo bhi /students ke name se request aata hai studentRoutes ko bhej deta hai match kar ke nahi dekhta get post ya delect put hai.
app.listen(3000, () => {

    console.log("Server running on port 3000");

});