const { Schema, model } = require("mongoose");

const parkingSchema = new Schema({
	ID: {
		type: Number,
		required: true,
		unique: true,
	},
	vehicle: {
		year: {
			type: Number,
			required: true,
		},
		make: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		licensePlate: {
			type: String,
			required: true,
		},
	},
	resident: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Parking = model("Parking", parkingSchema);
module.exports = Parking;
