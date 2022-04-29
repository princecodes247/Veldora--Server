// Passport configuration
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// Load User Model user.js
const User = require('../models/User');
const UserService = require('../services/user.service');

function passportConfig (passport) {
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     // Match user
//     const user = await User.findOne({ email });
//     if (err) { return done(err); }
//     if (!user) {
//         return done(null, false, { message: 'That email is not registered' });
//     }
//     // Match password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return done(null, false, { message: 'Password incorrect' });
//     }
//     return done(null, user);
// }))

  
  passport.use(
    'login',
    new LocalStrategy(
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
  
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}

module.exports = passportConfig;