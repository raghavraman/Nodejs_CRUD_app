var express = require("express"),
    login = require('./routes/loginUser'),
    bodyParser = require("body-parser"),
    exphbs = require('express-handlebars'),
    cookieParser = require("cookie-parser"),
    passwordHash = require('password-hash'),
    session = require('express-session');


//Create app and use body-parser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Allow cross orgin requests
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

console.log("sdsadsd      ", __dirname);
app.set('views', __dirname + '/views');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

function isAuthenticated(req, res, next) {
    if (req.path == "/login" || req.path == "/logout" || req.path == '/registeruser') {
        next();
    } else {
        if (req.cookies['_ot'] && req.cookies['_at']) {
            if (passwordHash.verify(req.cookies['_at'], req.cookies['_ot'])) {
                next();
            } else {
				res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }
}

app.use(isAuthenticated);

app.use(require('./routes'));


app.listen(3000);