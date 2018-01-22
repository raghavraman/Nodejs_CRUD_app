/**
    TODO:
    1. Get all Projects
    2. Get Project by ID
    3. Add project
    4. Update project
    5. Delete project

    MODEL:
      project = {
        "id",
        "project_name",
        "customer_id",
        "created_at",
        "updated_at",
    }

**/

var db = require('../db');

var express = require('express')
var router = express.Router();

//Get all projects
router.get('/projects', function(req, res) {

    db.query('SELECT * from projects', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all project", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "results": results
            // });
            res.render('projects', {
                valuesss: results,
                activeProjects: 'active'
            });
        }
    });

});

//Get projects by id
router.get('/getproject/:projid', function(req, res) {

    var projid = req.params.projid;

    db.query('SELECT * from projects where id = ?', projid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting project details of " + projid, error);
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


router.get('/addproject', function(req, res) {
    db.query('SELECT id from customers', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all user", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.render('addproject', {
                "code": 200,
                "customer_ids": results,
                "activeProjects": 'active'
            });
        }
    });
});

//Add project
router.post('/addproject', function(req, res) {

    var today = new Date();
    var project = {
        "project_name": req.body.project_name,
        "customer_id": req.body.customer_id,
        "created_at": today,
        "updated_at": today
    }

    db.query("INSERT INTO projects SET ?", project, function(error, results, feilds) {

        if (error) {
            console.log("error ocurred while Adding new project", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "success": "projects added sucessfully",
            //     "results": results
            // });
            res.redirect('/projects');
        }
    });
});

//update project
router.put('/updateproject/:projid', function(req, res) {

    var projid = req.params.projid,
        today = new Date(),
        project = {};

    if (req.body.project_name != null) {
        project.project_name = req.body.project_name;
    }

    if (req.body.customer_id != null) {
        project.customer_id = req.body.customer_id;
    }

    project.updated_at = today;

    db.query("UPDATE projects SET ? WHERE id = ?", [project, projid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while Updating project " + projid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "projects updated sucessfully",
                "results": results
            });
        }
    });
});


//delete project
router.delete('/deleteproject/:projid', function(req, res) {

    var projid = req.params.projid;

    db.query("DELETE from projects WHERE id = ?", [projid], function(error, results, feilds) {
        if (error) {

            console.log("error ocurred while deleting project " + projid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "projects deleted sucessfully",
                "results": results
            });
        }
    });
});




module.exports = router;