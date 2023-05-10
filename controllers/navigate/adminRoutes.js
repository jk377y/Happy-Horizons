const express = require("express");
const router = express.Router();
const { checkLoggedIn } = require("../../middleware/checkLoggedIn");

const adminAuth = (req, res, next) => {
    req.session.loggedIn
    	? req.session.user.isAdmin
    		? next()
    		: res.redirect("/unauthorized")
    	: res.redirect("/notLoggedIn");
};

router.get("/", checkLoggedIn, adminAuth, function (req, res) {
	res.render("admin", { layout: "adminPanel.handlebars" });
});

module.exports = router;
