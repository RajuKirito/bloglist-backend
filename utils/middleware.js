const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (req, res, next) => {
  let authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    // console.log(authorization);
    authorization = authorization.replace("Bearer ", "");
    req.token = authorization;
    // console.log(req.token);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    //   console.log(user);
    req.user = user;
  }
  next();
};

module.exports = { tokenExtractor, userExtractor };
