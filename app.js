var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  passport = require('passport'),
  assert = require('assert'),
  flash = require('connect-flash');

var api = require('./routes/api/api');

var app = express();

//========DB CONNECTIONS=============
mongoose.connect(process.env.CHAR_MLAB_DB);

if (app.get('env') === 'development') {
  var MongoDBStore = require('connect-mongodb-session')(session);
  // open second connection pool for storing sessions
  var store = new MongoDBStore({
    uri: process.env.CHAR_MLAB_DB,
    collection: 'sessions'
  });

  // Catch errors
  store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });
};

//========APP CONFIGURATION=============
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14 // 2 weeks
  },
  saveUninitialized: true,
  resave: true,
  store: store
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport')(passport);

//========ROUTES=============
// pass passport for configuration
require('./routes/passport.js')(app, passport);
// var routes = require('./routes/passport.js')(app, passport); // load our routes and pass in our app
// app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//========ERROR HANDLERS=============
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


module.exports = app;
