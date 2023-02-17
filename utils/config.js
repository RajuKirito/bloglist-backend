require("dotenv").config();
const mongoose = require("mongoose");
const password = process.env.PASSWORD;

const PORT = process.env.PORT;

mongoose.set("strictQuery", false);
const MongoUrl =
  process.env.NODE_ENV === "test"
    ? `mongodb+srv://rajuCH:${password}@cluster0.nwgix9c.mongodb.net/testBlogList?retryWrites=true&w=majority`
    : `mongodb+srv://rajuCH:${password}@cluster0.nwgix9c.mongodb.net/blogList?retryWrites=true&w=majority`;

module.exports = { PORT, MongoUrl };
