var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var connectionVideo = require('./connectionVideo');
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
connectionVideo.init();
routes.configure(app);

var server = app.listen(process.env.PORT, function() {
  server.timeout = 600000; 
  console.log('Mymusicloader listening on port ' + server.address().port);
});