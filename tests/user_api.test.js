const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is only one user", () => {
  const initialUser = {
    username: "raju",
    name: "raju",
    password: "hello"
  };

  beforeEach(async () => {
    await User.deleteMany({});

    await api.post("/api/users").send(initialUser);
  });

  test("original user is valid", async () => {
    const users = await helper.usersInDB();

    expect(users[0].username).toEqual(initialUser.username);
    expect(users[0].name).toEqual(initialUser.name);
  });

  test("new user can be added", async () => {
    const user = {
      username: "ganesh",
      name: "ganesh",
      password: "howdy"
    };

    const initialUsers = await helper.usersInDB();

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const finalUsers = await helper.usersInDB();

    const usernames = finalUsers.map((user) => user.username);

    expect(finalUsers).toHaveLength(initialUsers.length + 1);
    expect(usernames).toContain("ganesh");
  });

  test("new user with same username exists with status code 400", async () => {
    const user = {
      username: "raju",
      name: "ganesh",
      password: "howdy"
    };

    const initialUsers = await helper.usersInDB();

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const finalUsers = await helper.usersInDB();

    expect(initialUsers).toEqual(finalUsers);
  });

  test("a user with username less than 3 characters cannot be created", async () => {
    const user = {
      username: "ra",
      name: "ganesh",
      password: "howdy"
    };

    const initialUsers = await helper.usersInDB();

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const finalUsers = await helper.usersInDB();

    expect(initialUsers).toEqual(finalUsers);
  });

  test("a user with name less than 3 characters cannot be created", async () => {
    const user = {
      username: "rahio",
      name: "ga",
      password: "howdy"
    };

    const initialUsers = await helper.usersInDB();

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const finalUsers = await helper.usersInDB();

    expect(initialUsers).toEqual(finalUsers);
  });

  test("the user can login properly and a token is returned", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: initialUser.username, password: initialUser.password })
      .expect(201);

    expect(result.body.token).toBeDefined();
    expect(result.body.username).toBe(initialUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
