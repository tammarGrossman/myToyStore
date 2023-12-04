const express = require('express');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const AppError = require('./errors/AppError');
const usersRouter = require('./routes/users.router');
const toysRouter = require('./routes/toys.router');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/toys',toysRouter);
app.all('*',(req,res,next)=>next(new AppError("this is not a legal request")))

module.exports = app;