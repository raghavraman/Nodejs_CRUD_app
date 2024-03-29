var db = require('../db');
var passwordHash = require('password-hash');
var express = require('express')
var router = express.Router();
var cookies = require("cookies");


// router.get('/timetracker', function(req, res) {
//  user_id = req.cookies['_atid'];
//     db.query('SELECT task_entries.id as entry_id,task_entries.task_id as task_id,task_entries.duration as duration,task_entries.note,task_entries.start_time,tasks.project_id,tasks.user_id,tasks.task_name,tasks.id as task_id from task_entries join tasks on tasks.id = task_entries.task_id where tasks.user_id=?',[user_id], function(error, results, feilds) {
//         if (error) {
//             console.log("error ocurred while getting all task_entries", error);
//             res.send({
//                 "code": 400,
//                 "failed": "error ocurred"
//             });
//         } else {
//             // res.send({
//             //     "code": 200,
//             //     "results": results
//             // });
//             console.log(results);
//             var totalDuration=0;
//             for(i =0;i<results.length;i++){
//              totalDuration+=parseInt(results[i].duration);}
//             res.render('timetracker', {
//                 valuesss: results,
//                 totalDuration:totalDuration,
//                 activeUsers: 'active'

//             });

//         }
//     });
// });


router.get('/timetracker', function(req, res) {
 project_id=req.query.project_id;
 user_id = req.cookies['_atid'];

 var queryString= "SELECT task_entries.id as entry_id,task_entries.task_id as task_id,task_entries.duration as duration,task_entries.note,task_entries.start_time,tasks.project_id,tasks.user_id,tasks.task_name,tasks.id as task_id from task_entries join tasks on tasks.id = task_entries.task_id where tasks.user_id=?"

 if(project_id!=null){
     queryString+= "and project_id = ?"
 }

    db.query(queryString,[user_id,project_id], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all task_entries", error);
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
            var totalDuration=0;
            for(i =0;i<results.length;i++){
            totalDuration+=parseInt(results[i].duration);}
            valuesss=results;
            // res.render('timetracker', {
            //     valuesss: results,
            //     totalDuration:totalDuration,
            //     activeUsers: 'active'

            // });
             db.query('SELECT id from projects', function(error, results, feilds) {
                if (error) {
                    console.log("error ocurred while getting all project_id", error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    project_ids = results;
                    res.render('timetracker',{
                        "project_ids": project_ids,
                        valuesss: valuesss,
                        totalDuration:totalDuration,
                        activeTime: 'active'
                    });
                }
            });

        }
    });
});






// router.get('/timetracker', function(req, res) {
//     project_id = req.query.project_id;
//     customer_id = req.query.customer_id;
//     if (customer_id == null) {
//         user_id = req.cookies['_atid'];

//         var queryString = "SELECT task_entries.id as entry_id,task_entries.task_id as task_id,task_entries.duration as duration,task_entries.note,task_entries.start_time,tasks.project_id,tasks.user_id,tasks.task_name,tasks.id as task_id from task_entries join tasks on tasks.id = task_entries.task_id where tasks.user_id=?"

//         if (project_id != null) {
//             queryString += "and project_id = ?"
//         }

//         db.query(queryString, [user_id, project_id], function(error, results, feilds) {
//             if (error) {
//                 console.log("error ocurred while getting all task_entries", error);
//                 res.send({
//                     "code": 400,
//                     "failed": "error ocurred"
//                 });
//             } else {
//                 // res.send({
//                 //     "code": 200,
//                 //     "results": results
//                 // });
//                 console.log(results);
//                 var totalDuration = 0;
//                 for (i = 0; i < results.length; i++) {
//                     totalDuration += parseInt(results[i].duration);
//                 }
//                 valuesss = results;
//                 // res.render('timetracker', {
//                 //     valuesss: results,
//                 //     totalDuration:totalDuration,
//                 //     activeUsers: 'active'

//                 // });
//                 db.query('SELECT id from projects', function(error, results, feilds) {
//                     if (error) {
//                         console.log("error ocurred while getting all project_id", error);
//                         res.send({
//                             "code": 400,
//                             "failed": "error ocurred"
//                         });
//                     } else {
//                         project_ids = results;
//                         res.render('timetracker', {
//                             "project_ids": project_ids,
//                             valuesss: valuesss,
//                             totalDuration: totalDuration,
//                             activeTime: 'active'
//                         });
//                     }
//                 });

//             }
//         });

// });















router.get('/timetracker/', function(req, res) {
    var date = req.body.date;
    db.query('SELECT * from task_entries join tasks on tasks.id = task_entries.task_id  where Date(start_time)=?', [date], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting all task_entries", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {

            console.log(results);
            res.render('timetracker', {
                valuesss: results,
                activeUsers: 'active'
            });

        }
    });
});

router.put('/starttimer/:taskentryid', function(req, res) {
    var taskentryid = req.params.taskentryid;
    console.log(taskentryid);
    db.query('UPDATE task_entries set start_time=CURTIME() where id=?', [taskentryid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting starting timer", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            console.log(results);
            res.send({
                "code": 200,
                "results": results
            });
        }
    });
});
router.put('/stoptimer/:taskentryid', function(req, res) {
    var taskentryid = req.params.taskentryid;
    console.log(taskentryid);
    var duration = req.body.duration;
    console.log("new Dur ", duration);
    db.query('UPDATE task_entries set duration=?,start_time="00:00:00" where id=?', [duration, taskentryid], function(error, results, feilds) {
        if (error) {
            console.log("error ocurred while getting starting timer", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            console.log(results);
            res.send({
                "code": 200,
                "results": results
            });
        }
    });
});


module.exports = router;