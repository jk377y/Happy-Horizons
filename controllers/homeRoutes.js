const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { checkLoggedIn } = require('../middleware/checkLoggedIn');

//! WORKING
// loads homepage
router.get("/", checkLoggedIn, function (req, res) {
	res.render("homepage");
});

//! WORKING
// when submitting login
router.post("/", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
	  // Display an alert message if the user doesn't exist
	  res.send('<script>alert("Invalid login credentials. Please try again."); window.location.href="/";</script>');
	} else {
	  const match = await bcrypt.compare(password, user.password);
	  if (match) {
		req.session.user = user;
		req.session.loggedIn = true;
		res.render("homepage", { loggedIn: true, firstName: user.firstName, isAdmin: user.isAdmin });
	  } else {
		// Display an alert message if the password is incorrect
		res.send('<script>alert("Invalid login credentials. Please try again."); window.location.href="/";</script>');
	  }
	}
  });

//! WORKING
// when submitting logout
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.redirect("/");
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
