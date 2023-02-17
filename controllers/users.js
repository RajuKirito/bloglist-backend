const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const result = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1
  });
  res.json(result);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  });

  try {
    const result = await user.save();

    res.status(201).json(result);
  } catch (exception) {
    res
      .status(400)
      .json({ error: "invalid user created name or username is invalid" });
  }
});

module.exports = userRouter;
