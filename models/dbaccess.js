var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var login = 'admin';
var password = 'admin';
var database = 'morningnews';

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------

mongoose.connect(`mongodb+srv://${login}:${password}@cluster0.gl5x5.mongodb.net/${database}?retryWrites=true&w=majority`,
  options,
  function(err) {
  if (err) {
    console.log(`error, failed to connect to the database because --> ${err}`);
  } else {
    console.info('*** Database connection : Success! ***');
  }
  }
);