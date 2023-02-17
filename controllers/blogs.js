const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("creator", {
    username: 1,
    name: 1
  });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  if (!req.body.likes) {
    req.body.likes = 0;
  }

  // const decodedToken = jwt.decode(req.token, process.env.SECRET);
  const user1 = req.user;
  if (!user1) {
    return res.status(401).end();
  }

  const user = await User.findById(user1.id);

  const blogToCreate = {
    creator: user._id,
    ...req.body
  };

  const blog = new Blog(blogToCreate);
  try {
    const savedBlog = await blog.save();
    // console.log(user);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(blog);
  } catch (exception) {
    res.status(400).end();
  }
});

blogRouter.put("/:id", async (req, res) => {
  const user = req.user;

  const blog = await Blog.findById(req.params.id);

  if (user.id.toString() === blog.creator.toString()) {
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query"
    });
    res.status(200).json(newBlog);
  } else {
    res.status(401).json({ error: "invalid token" });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  // const decodedToken = jwt.verify(req.token, process.env.SECRET);

  const blog = await Blog.findById(req.params.id);
  const user = req.user;

  if (user.id.toString() === blog.creator.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: "invalid Token" });
  }
});

module.exports = blogRouter;
