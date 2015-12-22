// Listing 9-5: lib/connection.js

var mongoose = require('mongoose');
var dbUrl = 'mongodb://meanstack:meanstack@ds027495.mongolab.com:27495/meanstack';
//Change to reflect your configuration if needed

mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

require('../models/employee');
require('../models/team');
require('../models/user');
