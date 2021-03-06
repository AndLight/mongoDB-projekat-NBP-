var createError           = require('http-errors');
var express               = require('express');
var path                  = require('path');
var cookieParser          = require('cookie-parser');
var logger                = require('morgan');
var exphbs                = require('express-handlebars');
var mongoose              = require('mongoose');
var Handlebars            = require('handlebars');
var session               = require('express-session');
var ObjectID              = require('mongodb').ObjectID;
var passport              = require('passport');
var flash                 = require('connect-flash');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var app = express();

const timeout = 1000 * 60 * 60 * 2; //2h

var indexRouter = require('./routes/index');
const user = require('./models/user');




// mongoose.connect('localhost: 27017/shopingdb');
mongoose.connect('mongodb://localhost/shopingdb')
        .then(console.log('MongoDB is connected'))
        .catch(err => console.log('MongoDB error: '+err));

//#region [rgba (0,128,128, 0.1)] SETUP

    // view engine setup
    app.engine('.hbs', exphbs.engine({defaultLayout: 'layout', extname: '.hbs',handlebars: allowInsecurePrototypeAccess(Handlebars)}))
    app.set('view engine', '.hbs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
      secret: "thisismysecrctekey",
      saveUninitialized: false,           //if empty value save?
      cookie: { maxAge: timeout },
      resave: false,                       //if we have not modified the sesion do you save?
      // store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(req, res, next) {
      if(req.session.email){
        res.locals.login =  true;
      }else{
        res.locals.login = false;
      }
      // console.log(res.locals.login)
      res.locals.session = req.session;
      next();
    });
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


