const connection = require('../server');
const User = require('../models/User');
const Unit = require('../models/Unit');
const usersSeeds = require('./users.json');
const unitSeeds = require('./units.json');

connection.then(async () => {
	try {
	  // Deleting any existing collections
	  await User.deleteMany({});
	  await Unit.deleteMany({});
	  // Creating the collections
	  await User.create(usersSeeds);
	  await Unit.create(unitSeeds);
	} catch (err) {
	  console.error(err);
	  process.exit(1);
	}

	console.log("=========== USER SEEDING WAS SUCCESSFUL!!! ============");
	console.log("=========== UNIT SEEDING WAS SUCCESSFUL!!! ============");
	process.exit(0);
});