const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');


const session = require("express-session");
const MongoStore = require('connect-mongo');
require('dotenv').config()
const {ensureAdmin, ensureAuthenticated, forwardAuthenticated} = require("./middlewares/auth.middleware")
// DB Config
// const db = require('./config/keys').mongoURI;
const DatabaseConnection = require('./config/dbConnection');
DatabaseConnection.connect();


// Passport Config
require("./config/passport")(passport);

app.use(
    session({
      secret: process.env.SESSION_SECRET || "SECRET",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: DatabaseConnection.dbURI()
      })
    })
  );
  // Connect flash for flash sessions
//   app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Route imports
const indexRouter = require('./routes/index.route');
const adminRouter = require('./routes/admin.route');
const authRouter = require('./routes/auth.route');
const projectRouter = require('./routes/project.route');
const userRouter = require('./routes/user.route');
const docsRouter = require('./routes/docs.route');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/auth', forwardAuthenticated, authRouter);
app.use('/admin', ensureAuthenticated, ensureAdmin, adminRouter);
app.use('/api/projects', ensureAuthenticated, projectRouter);
app.use('/api/users', ensureAuthenticated, userRouter);
app.use('/api/*', indexRouter);
app.use('/docs/*', docsRouter);
app.use('/', indexRouter);

module.exports = app;