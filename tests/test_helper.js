const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Raju is thope",
    author: "Raju",
    url: "https://google.com",
    likes: 10
  },
  {
    title: "Raju is great",
    author: "Ganesh",
    url: "https://yahoo.com",
    likes: 5
  },
  {
    title: "Ganesh is best",
    author: "Ganesh",
    url: "https://youtube.com",
    likes: 2
  }
];

const blogsInDB = async () => {
  const result = await Blog.find({});
  // console.log(result);

  const blogs = result.map((blog) => blog.toJSON());

  return blogs;
};

const usersInDB = async () => {
  const result = await User.find({});

  const users = result.map((user) => user.toJSON());
  return users;
};

module.exports = { initialBlogs, blogsInDB, usersInDB };
