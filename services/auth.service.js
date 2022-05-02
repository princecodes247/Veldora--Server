const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");

const login = async (req, user) => {
  let token = ""
  await req.login(user, { session: false }, async (error) => {
    if (error) return next(error);

    const body = { _id: user.data._id, email: user.data.email };
    token = await jwt.sign({ user: body }, "TOP_SECRET");
    console.log("req", token)
  });
  console.log("function", token)
  return token;
};
const logout = "";

module.exports = {
  
  login,
};
