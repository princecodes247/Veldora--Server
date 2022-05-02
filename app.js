const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");
require('dotenv').config()

// DB Config
// const db = require('./config/keys').mongoURI;
const connect = require('./config/dbConnection');
connect();

// Passport Config
require("./config/passport")(passport);

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  // Connect flash for flash sessions
//   app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Route imports
const indexRouter = require('./routes/index.route');
// const adminRouter = require('./routes/admin.route');
const authRouter = require('./routes/auth.route');
const projectRouter = require('./routes/project.route');
const userRouter = require('./routes/user.route');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
// app.use('/admin', adminRouter);
app.use('/api/projects', projectRouter);
app.use('/api/users', userRouter);
app.use('/api/*', passport.authenticate('jwt', { session: false }), indexRouter);
app.use('/', indexRouter);

module.exports = app;