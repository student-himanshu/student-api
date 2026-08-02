const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);//jo bhi /students ke name se request aata hai studentRoutes ko bhej deta hai match kar ke nahi dekhta get post ya delect put hai.

app.listen(3000, () => {

    console.log("Server running on port 3000");

});