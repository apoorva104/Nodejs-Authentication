const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const flash = require('connect-flash');

// Render the signin page
exports.renderSigninPage = (req, res) => {
  res.render('signin', { errorMessage: '' }); // Render your signin EJS template
};

// Process user signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.render('signin', { errorMessage: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('signin', { errorMessage: 'Invalid email or password' });
    }
    const displayName = user.username;
    //console.log(displayName);

    // User authentication successful, you can implement session handling or JWT generation here
    // For simplicity, we'll just render a success message
    //res.render('home', { user });
    res.redirect(`/home?name=${encodeURIComponent(displayName)}`);


  } catch (error) {
    console.error('Error during signin:', error);
    res.render('signin', { errorMessage: 'An error occurred during signin' });
  }
};
