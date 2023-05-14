const { Schema, model } = require("mongoose");

const unitSchema = new Schema({
    // formatted as building (A-Z), floor (1-4), unit number (01-08) (example: C205)
	apartmentNumber: {
		type: String,
		required: true,
		unique: true,
	},
    // chosen from ["The Waterfall", "The Spring", "The Galaxy", "The River"]
	floorPlan: {
		type: String,
		required: true,
	},
    // layouts that correspond to the floorPlan
    floorPlanImage: {
        type: String,
        required: true,
    },
    // models have between 1 and 3 bedrooms
    bedrooms: {
        type: Number,
        required: true,
    },
    // models have between 1 and 2 bathrooms
    bathrooms: {
        type: Number,
        required: true,
    },
    // should be a reference to the User model via the ObjectId
	tenant: {
		type: Schema.Types.ObjectId,
		ref: "User",
		default: null,
	},
    // will be used in Analytics to calculate vacancy rate/income/etc.
	monthlyRent: {
		type: Number,
		required: true,
	},
});

const Unit = model("Unit", unitSchema);
module.exports = Unit;
