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
		title: "Admin Panel",
		layout: "adminPanel.handlebars",
		stylesheet: "adminPanel.css",
	});
});

//! Working
// GET route to retreive ALL users, sorts by lastName ascending
router.get("/users", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const users = await User.find({}).sort({ lastName: 1 }).populate("unit");
		if (!users || users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}
		const userArray = users.map((user) => user.toObject());
		res.render("adminUsers", {
			users: userArray,
			title: "Users",
			layout: "adminPanel.handlebars",
			stylesheet: "adminPanel.css",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

//? Need more testing for making sure when user goes into unit collection that the unit also goes into the user collection
//! Working
// GET route to retrieve a single user's info by searching for their ID
router.get("/users/:id", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const userID = req.params.id;
		const user = await User.findById(userID).populate({
			path: "unit",
			select: "apartmentNumber floorPlan floorPlanImage bedrooms bathrooms monthlyRent",
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.render("adminUser", {
			user: user.toObject(),
			title: "User",
			layout: "adminPanel.handlebars",
			stylesheet: "adminPanel.css",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST route to create a new user
router.post("/users", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const { firstName, lastName, dob, email, password, phone, isAdmin } = req.body;
		const user = new User({ firstName, lastName, dob, email, password, phone, isAdmin });
		await user.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// DELETE route to delete a user
router.delete("/users/:id", checkLoggedIn, adminAuth, async (req, res) => {
	try {
		const userID = req.params.id;
		const user = await User.findByIdAndDelete(userID);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json({ message: "User deleted successfully" });
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
		const unitID = req.params.id;
		const unit = await Unit.findById(unitID).populate({
			title: "Unit",
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
