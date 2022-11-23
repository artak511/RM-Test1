const express = require('express');

const sourcesController = require('./controllers/sources/sources.controller');

const app = express();
app. use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/sources', sourcesController);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    error: req.app.get('env') === 'development' ? err : {},
    message: err.message
  });
});

module.exports = app;
