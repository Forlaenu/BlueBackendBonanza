require('dotenv').config()
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./models')
const store = new SequelizeStore({db: db.sequelize})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 's3cur3', // used to sign the cookie
    resave: false, // update session even w/ no change
    saveUninitialized:true, // always create a session
    cookie: {
        secure: false, // true: only accept https req's
        maxAge: 3600000, //time in milliseconds
    },
    store: store
}))
store.sync()
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
