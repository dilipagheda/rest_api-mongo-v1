'use strict';
const bodyParser = require('body-parser');

// load modules
const express = require('express');
const morgan = require('morgan');
const courses = require('./routes/courses');
const users = require('./routes/users');
const mongoose = require('mongoose');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

// TODO setup your api routes here
/* Add routes */
// app.use('/', routes);
app.use('/api/courses', courses);
app.use('/api/users', users);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});



mongoose.connect('mongodb://localhost/fsjstd-restapi')
.then(function(){
  console.log("Database is connected successfully!");
  app.listen(3000, () => {
    console.log(`Express server is listening on port 3000`);
  });
})
.catch(function(err){
  console.log("Error connecting database!"+err);

})

