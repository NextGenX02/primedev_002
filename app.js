var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const engine = require("consolidate")
const cookieVerify = require('./middleware/cookie_verify')

// Routes
var indexRouter = require('./routes/index');
const usersRouter = require('./apiRoutes/nextcamp/user/me');
const apiIndexRouter = require('./apiRoutes/index')
const nextcampRouter = require('./apiRoutes/nextcamp/track/api')

var app = express();

// Rewrite some Header
app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "NextGenX | NGX | V1.0")
    // Fix Cors Problem
    res.setHeader("Access-Control-Allow-Origin", "*") // Let's allow every request from different origins for now
    next();
})
// Custom Middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", __dirname + "/public")
// Rewrite the default engine to use html engine instead ejs engine
app.engine('html', engine.mustache)
app.set('view engine', 'html');

app.use((req, res, next) => {
    try {
        cookieVerify(req.cookies, req.path)
        next();
    } catch (error) {
        next(error);
    }
})


app.use('/', indexRouter);
app.use('/shiku/primedev/api', apiIndexRouter)
app.use('/shiku/nextcamp/api/user', usersRouter)
app.use('/shiku/nextcamp/api', nextcampRouter)


module.exports = app;
