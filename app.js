var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var apiController = require('./Controllers/apiController')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(logger('common', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
apiController(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Mongo DB connections
mongoose.connect('mongodb://mourya:mourya@ds019472.mlab.com:19472/addressbook');

//Delcaring Schema
var Schema = mongoose.Schema;
var personSchema = new Schema({
  firstName: String,
  lastName: String,
  Address: String
});

//Creating Model out of schema
var Person = mongoose.model('Person', personSchema);

//Creating instance like Person Model
/*var john = Person({
  firstName: 'Mourya',
  lastName: 'Rajala',
  Address: '12402 west'
});

//Saving the instance in the database.
john.save(function(err){
  console.log(err); 
  console.log('Person is saved successFully');
});*/


Person.find({},(err,users)=>{
  console.log(users);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000);
