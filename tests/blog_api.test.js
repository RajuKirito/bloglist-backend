const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");
const { default: mongoose } = require("mongoose");

const api = supertest(app);

const user = {
  username: "ganesh",
  name: "ganesh",
  password: "howdy"
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await api.post("/api/users").send(user);

  const token = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  // console.log(token.body);

  const blogsPromiseArray = helper.initialBlogs.map((blog) =>
    api
      .post("/api/blogs")
      .send(blog)
      .set({ Authorization: "Bearer " + token.body.token })
  );

  // const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(blogsPromiseArray);
});

test("blogs are returned in JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("There are 3 blogs in the DB", async () => {
  const blogs = await helper.blogsInDB();

  expect(blogs).toHaveLength(helper.initialBlogs.length);
});

test("blog has id property", async () => {
  const blogs = await helper.blogsInDB();

  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

test("A new blog can be posted", async () => {
  const blog = {
    title: "Ganesh is awesome",
    author: "raju",
    url: "https://facebook.com",
    likes: 7
  };

  const token = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });

  await api
    .post("/api/blogs")
    .send(blog)
    .set({ Authorization: "Bearer " + token.body.token });

  const finalBlogs = await helper.blogsInDB();

  expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1);
});

test("not having a like property should automatically assign likes to 0", async () => {
  const blog = {
    title: "Ganesh is awesome",
    author: "raju",
    url: "https://facebook.com"
  };

  await api.post("/api/blogs").send(blog);

  const finalBlogs = await helper.blogsInDB();

  finalBlogs.forEach((blog) => {
    expect(blog.likes).toBeDefined();
  });
});

test("not having title or url in new post will result in an error", async () => {
  const blogOne = {
    author: "raju",
    url: "https://facebook.com",
    likes: 100
  };

  const blogTwo = {
    title: "Ganesh is not there",
    author: "raju",
    likes: 50
  };

  const token = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });

  await api
    .post("/api/blogs")
    .send(blogOne)
    .set({ Authorization: "Bearer " + token.body.token })
    .expect(400);
  await api
    .post("/api/blogs")
    .send(blogTwo)
    .set({ Authorization: "Bearer " + token.body.token })
    .expect(400);
});

test("Blog is deleted with status code 204 if successful", async () => {
  const initialBlogs = await helper.blogsInDB();

  const idOfBlog = initialBlogs[0].id;
  // console.log(typeof idOfBlog);

  const token = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  await api
    .delete(`/api/blogs/${idOfBlog}`)
    .set({ Authorization: "Bearer " + token.body.token })
    .expect(204);

  const finalBlogs = await helper.blogsInDB();

  expect(finalBlogs).toHaveLength(initialBlogs.length - 1);
});

test("Able to update a blog post with a valid id", async () => {
  const initialBlogs = await helper.blogsInDB();

  const idOfBlog = initialBlogs[0].id;

  const blog = {
    title: "vankai",
    url: "https://dondakaya.com",
    likes: 100
  };

  const token = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });

  await api
    .put(`/api/blogs/${idOfBlog}`)
    .set({ Authorization: "Bearer " + token.body.token })
    .send(blog);

  const finalBlogs = await helper.blogsInDB();

  const returnBlog = finalBlogs.filter((b) => {
    return b.title == blog.title;
  });

  expect({
    title: returnBlog[0].title,
    url: returnBlog[0].url,
    likes: returnBlog[0].likes
  }).toEqual(blog);
});

describe("returns with status code 401 if token is not provided", () => {
  test("when post", async () => {
    const blog = {
      title: "Ganesh is awesome",
      author: "raju",
      url: "https://facebook.com",
      likes: 7
    };

    await api.post("/api/blogs").send(blog).expect(401);

    const finalBlogs = await helper.blogsInDB();

    expect(finalBlogs).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
