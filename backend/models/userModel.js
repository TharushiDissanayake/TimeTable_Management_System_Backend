const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "User name already exists"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
    mobileNo: {
      type: Number,
      required: [true, "Please add the mobile number"],
    },
    role: {
        type: String,
        enum: ["Admin", "Faculty", "Student"],
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
