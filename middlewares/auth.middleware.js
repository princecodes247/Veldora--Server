const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.level == 2) {
    return next();
  }
  res.redirect("/login");
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
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
  forwardAuthenticated
};
