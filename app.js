require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MongoUrl)
  .then(() => {
    logger.info("connected to db");
  })
  .catch(logger);

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
