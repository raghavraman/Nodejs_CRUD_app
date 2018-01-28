var mysql = require('mysql');
var settings = require('./settings.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings["db"]);

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
                setTimeout(connectDatabase, 2000);
            } else {
                console.log('Error connecting database!');
            }
        });

         db.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
              connectDatabase();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
              throw err;                                  // server variable configures this)
            }
          });

        var del = db._protocol._delegateError;
        db._protocol._delegateError = function(err, sequence){
          if (err.fatal) {
            console.trace('fatal error: ' + err.message);
          }
          return del.call(this, err, sequence);
        };

    }
    return db;
}

module.exports = connectDatabase();