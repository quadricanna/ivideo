var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var connectionMusicDB = require('./connectionMusicDB');

var routes = require('./routes');


var app = express();
app.use(bodyparser.urlencoded({limit: '4000mb', extended: true}));
app.use(bodyparser.json({limit: '4000mb', extended: true}));
 
var swStats = require('swagger-stats');
app.use(swStats.getMiddleware({
  timelineBucketDuration:500000, 
  authentication: false,
    sessionMaxAge: 10000,
  onAuthenticate: function(req,username,password){
    // simple check for username and password
    return((username==='admin') && (password==='project123') );
}}));

connection.init();
connectionMusicDB.init();
routes.configure(app);

var server = app.listen(process.env.PORT, function() {
  console.log('Server listening on port ' + server.address().port);
});

