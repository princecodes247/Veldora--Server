// Passport configuration
const LocalStategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User Model user.js
const User = require('../models/user');

