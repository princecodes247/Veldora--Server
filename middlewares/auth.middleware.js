const passport = require("passport");
const UserService = require("../services/user.service");

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.level == 2) {
    return next();
  }
  res.redirect("/login");
};

const ensureAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }  
  passport.authenticate('jwt', { session: false })(req,res,next)
  
};

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  forwardAuthenticated,
};
