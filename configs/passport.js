// Passport configuration
const LocalStategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
// Load User Model user.js
const User = require('../models/user');

passport.use(new LocalStategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Match user
    const user = await User.findOne({ email });
    if (err) { return done(err); }
    if (!user) {
        return done(null, false, { message: 'That email is not registered' });
    }
    // Match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return done(null, false, { message: 'Password incorrect' });
    }
    return done(null, user);
}))