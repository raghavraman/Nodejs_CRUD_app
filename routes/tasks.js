/**
    TODO:
    1. Get all tasks
    2. Get task by ID
    3. Add task
    4. Update task
    5. Delete task

    MODEL:
    task = {
        "id",
        "project_id",
        "user_id",
        "task_name",
        "created_at",
        "updated_at",
    }

**/

var db = require('../db');

var express = require('express')
var router = express.Router();

//Get all tasks
router.get('/tasks', function(req, res) {

    db.query('SELECT * from tasks', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all task", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "results": results
            // });
            res.render('tasks', {
                valuesss: results,
                activeTasks: 'active'
            });
        }
    });

});

//Get tasks by id
router.get('/gettask/:taskid', function(req, res) {

    var taskid = req.params.taskid;

    db.query('SELECT * from tasks where id = ?', taskid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting task details of " + taskid, error);
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
router.get('/addtask', function(req, res) {
    var user_ids = [];
    var project_ids = [];
    db.query('SELECT id from users', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all user", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            user_ids = results;
            console.log(user_ids);
            db.query('SELECT id from projects', function(error, results, feilds) {
                if (error) {
                    console.log("error ocurred while getting all user", error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    console.log("INSIDE ", user_ids);
                    project_ids = results;
                    res.render('addtask',{
                        "code": 200,
                        "project_ids": project_ids,
                        "user_ids": user_ids,
                        "activeTasks": 'active'
                    });
                }
            });

        }
    });
});

//Add task
router.post('/addtask', function(req, res) {

    var today = new Date();
    var task = {
        "project_id": req.body.project_id,
        "task_name": req.body.task_name,
        "user_id": req.body.user_id,
        "created_at": today,
        "updated_at": today
    }

    db.query("INSERT INTO tasks SET ?", task, function(error, results, feilds) {

        if (error) {
            console.log("error ocurred while Adding new task", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            // res.send({
            //     "code": 200,
            //     "success": "tasks added sucessfully",
            //     "results": results
            // });
            res.redirect('/tasks');
        }
    });
});

//update task
router.put('/updatetask/:taskid', function(req, res) {

    var taskid = req.params.taskid,
        today = new Date(),
        task = {};

    if (req.body.task_name != null) {
        task.task_name = req.body.task_name;
    }

    if (req.body.customer_id != null) {
        task.customer_id = req.body.customer_id;
    }

    task.updated_at = today;

    db.query("UPDATE tasks SET ? WHERE id = ?", [task, taskid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while Updating task " + taskid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "tasks updated sucessfully",
                "results": results
            });
        }
    });
});


//delete task
router.delete('/deletetask/:taskid', function(req, res) {

    var taskid = req.params.taskid;
    db.query("DELETE from tasks WHERE id = ?", [taskid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while deleting task " + taskid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "tasks deleted sucessfully",
                "results": results
            });
        }
    });
});

module.exports = router;