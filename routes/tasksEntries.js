/**
    TODO:
    1. Get all taskentries
    2. Get task by ID
    3. Add task
    4. Update task
    5. Delete task

    MODEL:
    taskEntries = {
        "id",
        "task_id",
        "duration",
        "note",
        "start_time"
        "created_at",
        "updated_at"
    }

**/

var db = require('../db');

var express = require('express')
var router = express.Router();

//Get all taskentries
router.get('/getalltaskentries', function(req, res) {

    db.query('SELECT * from task_entries', function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all task entries", error);
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

//Get taskentries by id
router.get('/gettaskentry/:entryid', function(req, res) {

    var entryId = req.params.entryid;

    db.query('SELECT * from task_entries where id = ?', entryid, function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting task Entry details of " + entryid, error);
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


//Add task
router.post('/addtaskentry', function(req, res) {

    var today = new Date();
    var taskEntry = {
        "task_id": req.body.task_id,
        "duration": req.body.duration,
        "note": req.body.note,
        "start_time": req.body.start_time,
        "created_at": today,
        "updated_at": today
    }

    db.query("INSERT INTO taskentries SET ?", taskEntry, function(error, results, feilds) {

        if (error) {
            console.log("error ocurred while Adding new task Entry", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "taskentries added sucessfully",
                "results": results
            });
        }
    });
});

//update task
router.put('/updatetaskentry/:entryid', function(req, res) {

    var entryid = req.params.entryid,
        today = new Date(),
        taskEntry = {};

    if (req.body.task_id != null) {
        taskEntry.task_name = req.body.task_id;
    }

    if (req.body.duration != null) {
        taskEntry.duration = req.body.duration;
    }

    if (req.body.note != null) {
        taskEntry.note = req.body.note;
    }

    if (req.body.start_time != null) {
        taskEntry.start_time = req.body.start_time;
    }

    taskEntry.updated_at = today;

    db.query("UPDATE task_entries SET ? WHERE id = ?", [task, entryid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while Updating task Entry " + entryid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "taskentries updated sucessfully",
                "results": results
            });
        }
    });
});


//delete task
router.delete('/deletetaskentry/:entryid', function(req, res) {

    var entryid = req.params.entryid;
    db.query("DELETE task_entries WHERE id = ?", [entryid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while deleting task Entry" + entryid, error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                "code": 200,
                "success": "taskentries deleted sucessfully",
                "results": results
            });
        }
    });
});

module.exports = router;