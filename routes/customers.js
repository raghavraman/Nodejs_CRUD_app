/**
	TODO:
	1. Get all Customers
	2. Get Customer by ID
	3. Add customer
	4. Update Customer
	5. Delete Customer

	MODEL:
	 customer = {
        "id",
        "company",
        "address",
        "city",
        "state",
        "zip",
        "created_at",
        "updated_at",
    }

**/

var db = require('../db');

var express = require('express')
var router = express.Router();

//Get all customers
router.get('/getallcustomer', function(req, res) {

    db.query('SELECT * from customers', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all Customer", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "results": results
            });
        }
    });

});

//Get customers by id
router.get('/getcustomer/:custid', function(req, res) {

    var custid = req.params.custid;

    db.query('SELECT * from customers where id = ?', custid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting Customer details of " + custid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "results": results
            });
        }
    });

});


//Add customer
router.post('/addcustomer', function(req, res) {

    var today = new Date();
    var customer = {
        "company": req.body.company,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zip,
        "created_at": today,
        "updated_at": today
    }

    db.query("INSERT INTO customers SET ?", customer, function(error, results, feilds) {

        if (error) {
            console.log("error ocurred while Adding new customer", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "customers added sucessfully",
                "results": results
            });
        }
    });
});

//update Customer
router.put('/updatecustomer/:custid', function(req, res) {

    var custid = req.params.custid,
        today = new Date(),
        customer = {};

    if (req.body.company != null) {
        customer.company = req.body.company;
    }

    if (req.body.state != null) {
        customer.state = req.body.state;
    }

    if (req.body.address != null) {
        customer.address = req.body.address;
    }

    if (req.body.city != null) {
        customer.city = req.body.city;
    }

    if (req.body.zip != null) {
        customer.zip = req.body.zip;
    }

    customer.updated_at = today;

    db.query("UPDATE customers SET ? WHERE id = ?", [customer, custid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while Updating customer " + custid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "customers updated sucessfully",
                "results": results
            });
        }
    });
});


//delete Customer
router.delete('/deletecustomer/:custid', function(req, res) {

    var custid = req.params.custid;

    db.query("DELETE from customers WHERE id = ?", custid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while deleting customer " + custid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "customers deleted sucessfully",
                "results": results
            });
        }
    });
});

module.exports = router;