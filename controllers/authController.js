const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Authenticate user
exports.authenticateUser = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/signin',
  failureFlash: true,
});

// Middleware to check if the user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};
