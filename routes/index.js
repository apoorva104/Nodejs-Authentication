const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const homeController=require('../controllers/homeContropller')
const authController = require('../controllers/authController');
const signupController = require('../controllers/signupController');
const signinController = require('../controllers/signinController');
const resetPasswordController = require('../controllers/resetPasswordController');
const signoutController = require('../controllers/signoutController');
// Sign-up route
router.get('/', function(req, res) {
  res.redirect('/signup');
 });
router.get('/signup', (req, res) => {
  //console.log("dfgh")

  signupController.renderSignupPage(req, res);
});

// Route for signing up
router.post('/signup', (req, res) => {
  signupController.signup(req, res);
});

// Sign-in route
router.get('/signin', (req, res) => {
  // Call the signinController's renderSigninPage method
  signinController.renderSigninPage(req, res);
});

// Route for processing user signin
router.post('/signin', (req, res) => {
  // Call the signinController's signin method
  signinController.signin(req, res);
});

//Google signin
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google Sign-In Callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    const username=req.user.username
   
    res.redirect(`/home?name=${encodeURIComponent(username)}`);
  }
);



// Sign-out route
//router.get('/signout', signoutController.signout);
router.get('/signout',(req,res) =>{
  signoutController.signout(req,res);
})
// Reset password routes
router.get('/reset-password', resetPasswordController.renderResetPasswordPage);
router.post('/reset-password', resetPasswordController.resetPassword);

// Home route (requires authentication)
router.get('/home', homeController.renderDashboardPage);


module.exports = router;
