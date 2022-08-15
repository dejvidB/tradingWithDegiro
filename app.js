var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var loginMiddleware = require('./middlewares/login');
var accountInfoRouter = require('./routes/accountInfo');
var searchRouter = require('./routes/search');
var stocksRouter = require('./routes/stocks');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(loginMiddleware);
app.use('/getAccountInfo', accountInfoRouter);
app.use('/search', searchRouter);
app.use('/stocks', stocksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).json({ 'message': 'Not found.' });
});

// error handler
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.log(err);
  res.status(err.status || 500);
  res.json({ 'message': err });
});

module.exports = app;
