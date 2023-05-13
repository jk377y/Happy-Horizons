const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must match an email address!"],
	},
	phone: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^\d{3}-\d{3}-\d{4}$/, "Must match a valid phone number!"],
	},
	password: {
		type: String,
		required: true,
	},
	unit: {
		type: Schema.Types.ObjectId,
		ref: "Unit",
		default: null,
	},
	isUser: {
		type: Boolean,
		default: true,
		required: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
		required: false,
	},
});

// hash user password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
