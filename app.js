var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


var indexRouter = require('./routes/index');

// mongoose.connect('localhost: 27017/shopingdb');
mongoose.connect('mongodb://localhost/shopingdb')
        .then(console.log('MongoDB is connected'))
        .catch(err => console.log('MongoDB error: '+err));

//#region [rgba (0,128,128, 0.1)] SETUP
    var app = express();


    // view engine setup
    app.engine('.hbs', exphbs.engine({defaultLayout: 'layout', extname: '.hbs',handlebars: allowInsecurePrototypeAccess(Handlebars)}))
    app.set('view engine', '.hbs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

//#endregion    
///////////////////////////////////////////////////////

module.exports = app;
