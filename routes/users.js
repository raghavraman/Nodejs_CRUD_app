/**
	TODO:
	1. Get all users
	2. Get user by ID
	3. Add user
	4. Update user
	5. Delete user

	MODEL:
	 users = {
        "username",
        "email",
        "password",
        "created_at",
        "updated_at"
    }
**/

var db = require('../db');
var passwordHash = require('password-hash');
var express = require('express')
var router = express.Router();

//Get all users
router.get('/users', function(req, res) {

    db.query('SELECT * from users', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all user", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "results": results
            // });
            console.log(results);
            res.render('users',{
                valuesss: results,
                activeUsers: 'active'
            });

        }
    });

});

//Get users by id
router.get('/getuser/:userid', function(req, res) {

    var userid = req.params.userid;

    db.query('SELECT * from users where id = ?', userid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting user details of " + userid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "results": results
            // });
            res.render("edituser",{user:results});
        }
    });

});

//update user
router.put('/updateuser/:userid', function(req, res) {

    var userid = req.params.userid,
        today = new Date(),
        user = {};

    if (req.body.user_name != null) {
        user.user_name = req.body.user_name;
    }

    if (req.body.password != null) {
        var hasPass = passwordHash.generate(req.body.password);
        user.password = hasPass;
    }

    if (req.body.email != null) {
        user.email = req.body.email;
    }

    user.updated_at = today;

    db.query("UPDATE users SET ? WHERE id = ?", [user, userid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while Updating user " + userid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "users updated sucessfully",
                "results": results
            });
        }
    });
});


//delete user
router.delete('/deleteuser/:userid', function(req, res) {

    var userid = req.params.userid;
    db.query("DELETE from users WHERE id = ?", [userid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while deleting user " + userid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "users deleted sucessfully",
                "results": results
            });
        }
    });
});


//ROUTE for registering
router.post("/registeruser", function(req,res){
    var today = new Date();
    var hasPass = passwordHash.generate(req.body.password);
    var users = {
        "username": req.body.username,
        "email": req.body.email,
        "password": hasPass
        ,
        "created_at": today,
        "updated_at": today
    }

    db.query('INSERT INTO users SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error.sqlMessage);
            console.log("error ocurred", error.code);

            res.send({
                "code": 400,
                "status":"failed",
                "error":error.code,
                "message": error.sqlMessage
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
      var username = req.body.username;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log(results[0].password);

            if (results.length > 0) {
                if(passwordHash.verify(password, results[0].password)){
                    // res.send({
                    //     "code": 200,
                    //     "success": "login sucessfull"
                    // });
                     res.redirect('/users');  
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

module.exports = router;