const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String, // Store Google OAuth ID if using Google authentication
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);
