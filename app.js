require("./config/env");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const { port, corsOrigin, env } = require("./config/env");

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: corsOrigin }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRoutes);
app.use("/students", studentRoutes);

app.use(errorHandler);

app.listen(port, () => {

    console.log(`Server running on port ${port} in ${env} mode`);

});

module.exports = app;
