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
	dob: {
		type: Date,
		required: true,
	},
	age: {
		type: Number,
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
		match: [/^\d{3}-\d{3}-\d{4}$/, "Must match a valid phone number!"],
	},
	password: {
		type: String,
		required: true,
	},
	unit: {
		type: Schema.Types.ObjectId,
		ref: "Unit",
		default: null,
		required: false,
	},
	otherOccupants: [{
		firstName: {
			type: String,
			required: false,
			trim: true,
		},
		lastName: {
			type: String,
			required: false,
			trim: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		age: {
			type: Number,
		},
		relationship: {
			type: String,
			required: false,
			trim: true,
		},
	}],
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

// virtual to calculate age
userSchema.virtual('calculateAge').get(function () {
	const currentDate = new Date();
	const birthDate = new Date(this.dob);
	const age = currentDate.getFullYear() - birthDate.getFullYear();
	const monthDiff = currentDate.getMonth() - birthDate.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
		return age - 1;
	}
	return age;
});

// pre-save middleware to calculate age for user
userSchema.pre('save', function (next) {
	this.age = this.calculateAge;
	next();
});

// pre-save middleware to calculate age for other occupants
userSchema.pre('save', function (next) {
	this.otherOccupants.forEach((occupant) => {
	  const currentDate = new Date();
	  const birthDate = new Date(occupant.dob);
	  const age = currentDate.getFullYear() - birthDate.getFullYear();
	  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
	  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
		occupant.age = age - 1;
	  } else {
		occupant.age = age;
	  }
	});
	next();
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
