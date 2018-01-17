var express = require("express"),
	login = require('./routes/loginUser'),
	bodyParser = require("body-parser");

//Create app and use body-parser
var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Allow cross orgin requests
app.use(function(req, res, next) {   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// router.post('/register',login.register);
// router.post('/login',login.login)
app.use('/api',require('./routes'));
app.listen(3000);