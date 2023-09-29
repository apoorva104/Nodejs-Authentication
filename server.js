const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const recaptcha = require('express-recaptcha');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const customWare = require('./config/middleware');

require('./config/passport')
// Configure and use express-recaptcha middleware
// recaptcha.init('6Le7zkYoAAAAADzupy3us7D5pMVsSnYnmrp-_crV', '6Le7zkYoAAAAAAsLpVGqd0a6owvDwCzqDMmeCqQK');
// app.use(recaptcha.middleware.verify);

// Configure environment variables (replace with your actual values)
const PORT = process.env.PORT || 4040;
const DB_URI = 'mongodb+srv://srivastavaapoorva104:QApKUdDRoHIUddx7@issuetracker.ldjqkn6.mongodb.net/?retryWrites=true&w=majority';
const SESSION_SECRET = 'your-session-secret';
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';

// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //createIndex: true
});

// Configure Express session and flash messages
app.use(session({
  name: 'Nodejs Authentication',
  secret: 'Apoorva',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded());
app.use(cookieParser());

app.use(flash());
app.use(customWare.setFlash)

// Passport.js configuration (in config/passport.js)
// ...

// Use the routes defined in routes/index.js
const routes = require('./routes');
app.use('/', routes);

// Serve static files (CSS, images, etc.) from the public directory
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('error', { errorMessage: '404 - Page not found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { errorMessage: '500 - Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
