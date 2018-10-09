require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const LocalStrategy = require("passport-local").Strategy;
const flash         = require("flash");
const user       = require('./models/user');
const bcrypt      = require("bcryptjs");

const session       = require('express-session');
const passport      = require('passport');

// require('./config/passport');


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/coDrop')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  user.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

passport.use(
  new LocalStrategy((username, password, next) => {
    user.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user, { message: "You have successfully logged in" });
    });
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

// default value for title local
app.locals.title = 'coDrop';


const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/authroutes');
app.use('/api', authRoutes);

const profileRoutes = require('./routes/profileRoutes')
app.use('/api', profileRoutes)

const blogsRoutes = require('./routes/blogsRoutes')
app.use('/api', blogsRoutes)

const clanRoutes = require('./routes/clanRoutes')
app.use('/api', clanRoutes)

const messageRoutes = require('./routes/messageRoutes')
app.use('/api', messageRoutes)

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
