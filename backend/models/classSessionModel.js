const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const classSessionSchema = mongoose.Schema(
  {
    batch: {
      type: String,
      required: [true, "Please add the batch"],
    },
    courseName: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Please add the cource name"],
    },
    day: {
        type: String,
        required: [true, "Please add the day"],
    },
    startTime: {
        type: String,
        required: [true, "Please add the start time"],
    },
    endTime: {
        type: String,
        required: [true, "Please add the end time"],
    },
    facultyName: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: [true, "Please add the faculty"],
    },
    location: {
        type: String,
        required: [true, "Please add the location"],
        ref: 'Resource',
    },
    slots: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ResourceAvailability" 
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClassSession", classSessionSchema);
