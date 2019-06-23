var mysql = require('mysql');
 
function Connection() {
  this.pool = null;
 
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 300,
      host: 'localhost',
      database: 'mymusicloader',
      timezone: '+01:00',
      port: '3306',
      charset : 'utf8mb4',
      user: 'root',
      password: 'Titilola07'
    });
  };
 
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}
 
module.exports = new Connection();