//add dependencies
var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var DB_URI_LOCAL="mongodb://localhost:27017/protoflio";
var DB_URI =  "mongodb://admin:admin@ds147920.mlab.com:47920/fasa7ny";
var passport = require('passport');
var schedule = require('node-schedule');
var globalCTRL = require('./app/controllers/globalCTRL');
var expressValidator = require('express-validator');

//configure app
app.use(bodyParser.urlencoded({extended:false})); //this line must be on top of app config
app.use(bodyParser.json());
app.use(expressValidator({
  customValidators: {
    isArray: function(value) {
      return Array.isArray(value);
    },
    gte: function(param, num) {
      return param >= num;
    }
  }
}));

var job1 = schedule.scheduleJob('59 23 * * *', globalCTRL.banDecrement);
var job2 = schedule.scheduleJob('59 23 * * 6', globalCTRL.sendNewsletter);
var job3 = schedule.scheduleJob('59 23 * * *', globalCTRL.overdueBookings);
// view engine setup
var cons = require('consolidate');
app.engine('html', cons.swig);//engine will render HTML
app.set('view engine', 'html');

var path = require('path');
app.use(require('serve-static')(path.resolve('public')));
//app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'kotomotoos', resave: true, saveUninitialized: true , secure:true, expire:false}));
app.use(passport.initialize());
app.use(passport.session());
//connect to local if failed to connect to mlab
mongoose.connect(DB_URI,function(err){
  if(err){
    mongoose.connect(DB_URI_LOCAL);
    console.log("connecting to local db..");
  }else{
    console.log("connecting to global db..");
  }
});
require('./app/config/passport')(passport);
app.use(require('./app/routes')(passport));


//start the server
app.listen(8080,function(){
  console.log("the app is listening on port 8080");
});
