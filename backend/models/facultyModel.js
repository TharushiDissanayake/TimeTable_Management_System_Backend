const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const facultySchema = mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: [true, "Please add the faculty name"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Faculty", facultySchema);
