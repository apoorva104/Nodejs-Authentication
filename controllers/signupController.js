// Import necessary modules
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const saltRounds = 10;
const flash = require('connect-flash');

// Function to render the signup page
exports.renderSignupPage = (req, res) => {
  res.render('signup', { errorMessage: '' }); // Render your signup EJS template
};

// Function to process user signup
exports.signup = async (req, res) => {
  //console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;

  try {

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('signup');

    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email is already registered');

      return res.redirect('signup');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save(); // Save the user to the database
    req.flash('success', 'Successfully signed up');
    // Redirect to the login page or any other page as needed
    res.redirect('/signin');
  } catch (error) {
    console.error('Error during signup:', error);
    req.flash('success', 'An error occurred during signup');
    res.redirect('signup');

  }
};
