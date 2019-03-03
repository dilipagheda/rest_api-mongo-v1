const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fsjstd-restapi');

const db = mongoose.connection;

db.on('error', function(){
    console.log("Error connecting database!");
});

db.once('open', function() {
  // we're connected!
  console.log("Database is connected successfully!");
});


