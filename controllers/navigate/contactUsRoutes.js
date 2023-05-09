const router = require("express").Router();
const User = require("../../models/User");

router.get("/", function (req, res) {
	const firstName = req.session.loggedIn ? req.session.user.firstName : null;
	const isAdmin = req.session.loggedIn ? req.session.user.isAdmin : null;
	res.render("contactUs", { loggedIn: req.session.loggedIn, firstName: firstName, isAdmin: isAdmin });
  });

module.exports = router;