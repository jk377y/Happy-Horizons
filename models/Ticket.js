const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
	resident: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	unit: {
		type: Schema.Types.ObjectId,
		ref: "Unit",
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "in progress", "completed"],
		default: "pending",
	},
	dateSubmitted: {
		type: Date,
		default: Date.now,
	},
	dateCompleted: {
		type: Date,
		default: null,
	},
});

const Ticket = model("Ticket", ticketSchema);
module.exports = Ticket;
