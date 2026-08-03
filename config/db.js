const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDB() {

    try {

        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected");

    } catch (error) {

        console.log(error);

    }

}

module.exports = connectDB;
