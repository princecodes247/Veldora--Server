const passport = require("passport");
const UserService = require("../services/user.service");

const ensureAdmin = (req, res, next) => {
  console.log("Auth", req.isAuthenticated())
  console.log("User", req.user)
  if (req.isAuthenticated() && req.user.level > 0) {
    return next();
  }
  res.status(403).json({ error: 'Not admin!' });
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

const allowedRequests = (req, res, next) => {
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  if (!allowedMethods.includes(req.method)) {
    res.status(405).send(`${req.method} not allowed.`);
  }

  next();
};

module.exports = {
  allowedRequests,
  ensureAuthenticated,
  ensureAdmin,
  forwardAuthenticated,
};
