const mongoose = require("mongoose");

const resourceAvailabilitySchema = mongoose.Schema({
  resourceCode: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Resource ID is required"],
    ref: "Resource",
  },
  day: {
    type: String,
    required: [true, "Day is mandatory"],
  },
  slot: {
    type: Number,
    required: [true, "Slot is mandatory"],
  },
});

module.exports = mongoose.model("ResourceAvailability", resourceAvailabilitySchema);
