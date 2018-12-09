var express = require("express");
var session = require("express-session");
var queries = require("./functions/queries.js");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/views/'));
app.use(session({ resave: true , secret: '123456' , saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use(function (req,res,next) {
  //console.log("/" + req.method);
  next();
});

router.get("/", function(req,res){
	if(!req.session.email)
		res.sendFile(path + "login.html");
	else
		res.send("You already logged in, logout <a href='/logout'>here</a>")	
});

router.get("/signup", function(req,res){
	res.sendFile(path + "signup.html");
});

app.post('/checklogin', function (req, res){
	queries.select(req.body.email, req.body.password, res, req);
});

app.post('/checksignup', function (req, res){
	queries.insert(req.body.emailsign, req.body.passwordsign, req.body.name, req.body.surname, res, req);
});

app.get("/logout",function(req,res){
	if(req.session.email){
		req.session.destroy(function(err)
		{
			if(err){
				res.negotiate(err);
			}
			res.redirect("/");
		});
	}
	else{
		res.send("You have to <a href = '/'>login</a> otherwise you can't use the logout feature");
	}
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});