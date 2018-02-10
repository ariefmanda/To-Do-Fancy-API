var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var boom = require('boom')
var cors = require('cors')
var fb = require('fb')
var mongoose = require('mongoose')
require('dotenv').config()
mongoose.connection.openUri('mongodb://localhost:27017/todo');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('mongoose connection success');
}).on('error', (error) => {
  console.log('connection error', error);
})
var index = require('./routes/index');
var api = require('./routes/api');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/api', api);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err)
});

module.exports = app;
