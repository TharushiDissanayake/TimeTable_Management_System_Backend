const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the course name"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Please add the course code"],
      unique: true,
    },
    description: {
        type: String,
        required: [true, "Please add the course description"],
    },
    credits: {
      type: Number,
      required: [true, "Please add the course credits"],
    },
    faculty: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Faculty" 
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
