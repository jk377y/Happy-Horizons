const db = require("../config/connection");
const User = require('../models/User');
const usersSeeds = require('./users.json');

db.once("open", async () => {
	try {
		// Deleting any existing collections
		await User.deleteMany({});
		// Creating the collections
		await User.create(usersSeeds);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	console.log("=========== USER SEEDING WAS SUCCESSFUL!!! ============");
	process.exit(0);
});