const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
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
  passport.authenticate('jwt', { session: false })
}

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserService.createUser({email, password});

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserService.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  forwardAuthenticated
};
