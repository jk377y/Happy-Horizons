const express = require("express");
const router = express.Router();
const { checkLoggedIn } = require("../../middleware/checkLoggedIn");
const { adminAuth } = require("../../middleware/adminAuth");

router.get("/", checkLoggedIn, adminAuth, function (req, res) {
	res.render("admin", {
		layout: "adminPanel.handlebars",
		stylesheet: "admin.css",
	});
});

module.exports = router;