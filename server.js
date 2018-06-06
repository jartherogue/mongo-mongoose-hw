/* Web Scraper Homework Solution Example
 *    (be sure to watch the video to see
 *     how to operate the site in the broser)
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */

// Require our dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

// Instantiate our Express App
var app = express();

// Designate our public folder as a static directory
app.use(express.static(__dirname + '/public'));

// connect Handlebars to our Express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect("mongodb://127.0.0.1:27017/nyTimeScrape_db");
// MongoDB Configuration configuration (Change this URL to your own DB)
// mongoose.connect('mongodb://putsomethinginhere');
// var db = mongoose.connection;

// db.on('error', function (err) {
//   console.log('Mongoose Error: ', err);
// });

// db.once('open', function () {
//   console.log('Mongoose connection successful.');
// });


// bring in our routes file into the the server files
var routes = require('./config/config.js');

// Incorporate these routes into our app
app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);


// set up our port to be either the host's designated port, or 3000
var port = process.env.PORT || 3000;

// set our app to listen on the port.
app.listen(port, function() {
    console.log("lisenting on port:" + port);
});
