
exports.signout = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle any errors that occur during logout
      console.error(err);
    }
    // Your callback function to perform additional actions
    // For example, you can display a message or redirect to a different page
    res.redirect('/signup'); // Redirect to the home page after signout
  });
};
