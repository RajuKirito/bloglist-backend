const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  author:String
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
