const mongoose = require("mongoose");

const studentShema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Resource ID is required"],
    ref: "User",
  },
  courses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    default: [],
    required: false,
  },
});

module.exports = mongoose.model("Student", studentShema);
