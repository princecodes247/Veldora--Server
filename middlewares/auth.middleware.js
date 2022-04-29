const passport = require('passport');
const UserService = require('../services/user.service');
const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.level == 2) {
    return next();
  }
  res.redirect("/login");
};

// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// };

const ensureAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user)
  next()
}

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

const signup = passport.authenticate('signup', { session: false })

const logout = ""

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  forwardAuthenticated,
  signup
};
