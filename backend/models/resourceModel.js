const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resourceSchema = mongoose.Schema(
  {
    resourceCode: {
      type: String,
      required: [true, "Please add the resource code"],
      unique: true,
    },
    resourceType: {
      type: String,
      enum: ["ClassRoom", "Lab", "Printer", "Projector"],
      required: [true, "Please add the resource type"],
      
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);
