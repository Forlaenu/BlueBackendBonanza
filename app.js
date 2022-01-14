require('dotenv').config()
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelizeSession = require('connect-session-sequelize')(session.Store);
const db = require('./models')
const store = new sequelizeSession({ db: db.sequelize })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listingRouter = require('./routes/listings');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
      secret: 'secret', // used to sign the cookie
      resave: false, // update session even w/ no changes
      saveUninitialized: true, // always create a session
      cookie: {
        secure: false, // true: only accept https req's
        maxAge: 3600000, // time in seconds, this one is equivalent to 30 days
      },
      store: store
    })
  );
  store.sync();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/listings', listingRouter);

module.exports = app;
