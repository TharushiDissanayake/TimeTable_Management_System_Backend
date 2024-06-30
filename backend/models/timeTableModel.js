const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeTableSchema = mongoose.Schema(
  {
    courseName: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TimeTable", timeTableSchema);
