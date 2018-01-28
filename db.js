var mysql = require('mysql');
var settings = require('./settings.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings["db"]);

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
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