const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// DB Config
// const db = require('./config/keys').mongoURI;
const connect = require('./config/dbConnection');
connect();



// Route imports
const indexRouter = require('./routes/index.route');
const adminRouter = require('./routes/admin.route');
const authRouter = require('./routes/auth.route');
const projectRouter = require('./routes/project.route');
const userRouter = require('./routes/user.route');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/auth', authRouter);
// app.use('/admin', authRouter);
// app.use('/project', authRouter);
app.use('/api/user', userRouter);
app.use('/', indexRouter);

module.exports = app;