var express = require("express"),
	login = require('./routes/loginUser'),
	bodyParser = require("body-parser"),
	exphbs = require('express-handlebars');


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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use("/css",express.static(__dirname + "/css"));
app.use("/js",express.static(__dirname + "/js"));

console.log("sdsadsd      ",__dirname);
app.set('views', __dirname + '/views');

// router.post('/register',login.register);
// router.post('/login',login.login)
app.use(require('./routes'));


app.listen(3000);
