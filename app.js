const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// Route imports
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');
const userRouter = require('./routes/user');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/auth', authRouter);
// app.use('/admin', authRouter);
// app.use('/project', authRouter);
app.use('/api/user', userRouter);
app.use('/', indexRouter);

module.exports = app;