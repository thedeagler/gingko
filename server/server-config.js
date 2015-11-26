var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var dbController = require('./services/controllers');
var path = require('path');
var passport = require('passport');
var facebookStrategy = require('./services/passportStrategies');

// require the routes file
var inRouter = require('./routes/in');
var outRouter = require('./routes/out');


var mealsRouter = require('./routes/mealsRouter');
var userRouter = require('./routes/userRouter');
var facebookRouter = require('./routes/facebookRouter');
var yelpRouter = require('./routes/yelpRouter');

// require isLoggedIn method so we can use it in routes to check if user is logged in
var isLoggedIn = require('./services/isLoggedIn');

facebookStrategy(passport);

inRouter = inRouter(dbController, passport, isLoggedIn);
outRouter = outRouter(dbController, passport, isLoggedIn);

mealsRouter = mealsRouter(dbController, passport, isLoggedIn);
userRouter = userRouter(dbController, passport, isLoggedIn);
facebookRouter = facebookRouter(dbController, passport, isLoggedIn);
yelpRouter = yelpRouter(dbController, passport, isLoggedIn);

var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use('/api/in', inRouter);
//these need to be above the route where they are used I think??
//http://stackoverflow.com/questions/29600759/passport-initialize-middleware-not-in-use-for-express-4-10-for-custom-callback
app.use(passport.initialize());
app.use(passport.session());

// app.use('/api/out', outRouter);


app.use('/meals', mealsRouter);
app.use('/user', userRouter);
app.use('/yelp', yelpRouter);
app.use('/api/out', facebookRouter);

app.use(express.static(path.join(__dirname, '/../client')));

module.exports = app;
