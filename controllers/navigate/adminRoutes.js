const express = require("express");
const router = express.Router();
const Unit = require("../../models/Unit");
const User = require("../../models/User");
const { checkLoggedIn } = require("../../middleware/checkLoggedIn");
const { adminAuth } = require("../../middleware/adminAuth");

//! Working
// GET route to load admin panel
router.get("/", checkLoggedIn, adminAuth, function (req, res) {
	res.render("admin", {
		layout: "adminPanel.handlebars",
		stylesheet: "admin.css",
	});
});

//! Working... currently returns correct JSON data. needs UI work
// GET route to retrieve a unit's info and populate tenant's firstName, lastName, phone and email
router.get("/units/:id", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const unitId = req.params.id;
		const unit = await Unit.findById(unitId).populate({
			path: "tenant",
			select: "firstName lastName phone email",
		});
		if (!unit) {
			return res.status(404).json({ message: "Unit not found" });
		}
		res.json(unit);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
