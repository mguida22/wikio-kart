'use strict';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');

let app = express();

// run in development unless specified
let env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.enable('view cache');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const index = require('./routes/index');
app.use('/', index);

const highscore = require('./routes/highscore');
app.use('/highscore', highscore);

// api routes
const api = require('./api/routes');
app.use('/api', api);

// catch all and send to home page
app.all('*', (req, res) => {
  res.redirect("/");
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    let response = {
      message: err.message,
      error: err,
      title: 'error'
    };
    res.status(err.status || 500);
    res.json(response);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  let response = {
    message: err.message,
    error: {},
    title: 'error'
  };
  res.status(err.status || 500);
  res.json(response);
});


module.exports = app;
