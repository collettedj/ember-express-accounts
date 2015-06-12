var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
//var mongoose = require('mongoose');
var app = express();


//mongoose.connect('mongodb://localhost/emberData');

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

if(process.env.NODE_ENV != 'test'){
  app.use(logger('dev'));  
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
   secret: 'mySecretKey',
   saveUninitialized: true,
   resave: true,
   cookie: { maxAge: 1200000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    if ('HEAD' == req.method || 'OPTIONS' == req.method) return next();

    // break session hash / force express to spit out a new cookie once per second at most
    req.session._garbage = Date();
    req.session.touch();

    next();
});

var flash = require('connect-flash');
app.use(flash());


var initPassport = require('./passport/init');
initPassport(passport);

require('./routes').useRoutes(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

 app.set('models', require('./models'));


module.exports = app;
