const { Schema, model } = require("mongoose");

const unitSchema = new Schema({
  apartmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  floorPlan: {
    type: String,
    required: true,
  },
  tenant: {
    // should be a reference to the User model via the ObjectId
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
});

const Unit = model("Unit", unitSchema);
module.exports = Unit;