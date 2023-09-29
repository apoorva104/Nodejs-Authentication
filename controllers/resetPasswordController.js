const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

// Render the reset password page
exports.renderResetPasswordPage = (req, res) => {
  res.render('reset-password', { errorMessage: '' }); // Render your reset-password EJS template
};

// Process reset password request
exports.resetPassword = async (req, res) => {
  console.log(req.body);
  const { email, newPassword, confirmNewPassword } = req.body;

  try {

    // Check if the newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      return res.render('reset-password', { errorMessage: 'Passwords do not match' });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.render('reset-password', { errorMessage: 'User not found' });
    }

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;
    await user.save();

    // Redirect to a success page or display a success message
    res.render('reset-password-success', { email, newPassword });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.render('reset-password', { errorMessage: 'An error occurred during password reset' });
  }
};
