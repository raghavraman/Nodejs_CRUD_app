var db = require('../db');

var express = require('express')
var router = express.Router()

//ROUTE for registering
router.post("/register", function(req,res){
	var today = new Date();
    var users = {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "updated_at": today
    }

    db.query('INSERT INTO users SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });
});

//Route for Loging in
router.post("/login", function(req,res){
	  var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
        	console.log(results[0].password);

            if (results.length > 0) {
                if (results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
});

module.exports =router;