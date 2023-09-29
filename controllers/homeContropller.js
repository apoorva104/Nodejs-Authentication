// // homeController.js

// // Assuming you're using Express.js
// const express = require('express');
// const router = express.Router();

// router.get('/home', (req, res) => {
//   // Retrieve the user's name from the query parameter
//   const userName = req.query.name;

//   // Render the home page and pass the user's name to the template
//   res.render('home', { userName });
// });

// module.exports = router;


// dashboardController.js

exports.renderDashboardPage = (req, res) => {
   // console.log("ghj")
    // Access user data if needed
   // const userName = req.user ? req.user.displayName : 'Guest';
    const userName = req.query.name;

    // Render the dashboard page and pass user data to the template
    res.render('home', { userName });
  };
  