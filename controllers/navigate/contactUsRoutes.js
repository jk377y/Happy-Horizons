const express = require('express');
const router = express.Router();
const { checkLoggedIn } = require('../../middleware/checkLoggedIn');

router.get("/", checkLoggedIn, function (req, res) {
	res.render("contactUs", {stylesheet: 'contactUs.css'});
});

module.exports = router;