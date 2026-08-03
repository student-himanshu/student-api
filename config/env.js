const path = require("path");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const envFile = path.resolve(process.cwd(), `.env.${env}`);

if (fs.existsSync(envFile)) {
    require("dotenv").config({ path: envFile });
}

module.exports = {
    env,
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173"
};
