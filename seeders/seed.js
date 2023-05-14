// database connection
const connection = require("../server");

// models to structure data
const User = require("../models/User");
const Unit = require("../models/Unit");
const Parking = require("../models/Parking");
const Ticket = require("../models/Ticket");

// seed data to populate collections
const usersSeeds = require("./users.json");
const unitSeeds = require("./units.json");

connection.then(async () => {
	try {
		// Deleting any existing collections
		await User.deleteMany({});
		console.log("=========== USER COLLECTION DELETED ============");
		await Unit.deleteMany({});
		console.log("=========== UNIT COLLECTION DELETED ============");
		await Parking.deleteMany({});
		console.log("=========== PARKING COLLECTION DELETED ============");
		await Ticket.deleteMany({});
		console.log("=========== TICKET COLLECTION DELETED ============");

		// Creating the collections
		await User.create(usersSeeds);
		console.log("=========== USER SEEDING WAS SUCCESSFUL!!! ============");
		await Unit.create(unitSeeds);
		console.log("=========== UNIT SEEDING WAS SUCCESSFUL!!! ============");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit(0);
});
