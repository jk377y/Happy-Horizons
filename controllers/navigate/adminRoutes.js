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

//! Working
// GET route to retreive ALL users
router.get("/users", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const users = await User.find();
		if (!users || users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

//? Need more testing for making sure when user goes into unit collection that the unit also goes into the user collection
//! Working
// GET route to retrieve a single user's info
router.get("/users/:id", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId).populate({
			path: "unit",
			select: "apartmentNumber floorPlan floorPlanImage bedrooms bathrooms monthlyRent",
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

//! Working
// GET route to retrieve ALL units
router.get("/units", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const units = await Unit.find();
		if (!units || units.length === 0) {
			return res.status(404).json({ message: "No units found" });
		}
		res.json(units);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
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
