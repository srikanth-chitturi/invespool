var mongoose = require('mongoose');

//var dbUri = 'mongodb://srikanth:srikanth@ds011321.mlab.com:11321/invespool';

var dbUri = 'mongodb://localhost:27017/invespool';

if (process.env.NODE_ENV === 'production') {
    dbUri = 'mongodb://srikanth:srikanth@ds011321.mlab.com:11321/invespool';
}

mongoose.connect(dbUri);


mongoose.connection.on('connected',function  () {
	console.log('Mongoose connected to '+dbUri);
});

mongoose.connection.on('error',function  (err) {
	console.log('Mongoose connection error '+err);
});

mongoose.connection.on('disconnected',function  () {
	console.log('Mongoose disconnected ');
});


// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});


// BRING IN YOUR SCHEMAS & MODELS
require('./borrowers');


