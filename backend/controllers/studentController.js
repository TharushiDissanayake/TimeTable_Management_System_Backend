const User = require("../models/userModel");
const Student = require("../models/studentEnrollmentModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Course = require("../models/courseModel");
const ClassSession = require("../models/classSessionModel");
//@desc Register a user
//@route Post /api/student/register
//@access private
const registerStudent = asyncHandler(async (req, res) => {
  console.log("Registered Student");
  const { username, email, password, mobileNo, role } = req.body;
  if (!username || !email || !password || !mobileNo || !role) {
    res.status(400);
  }

  const userAvailable = await User.findOne({ email: email });
  console.log(userAvailable);
  if (userAvailable) {
    return res.status(400).json({ error: "User already registered!" });
  }
  //HashPassword
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hash Password", hashPassword);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    mobileNo,
    role,
  });
  console.log(user);
  if (user) {
    const student = await Student.create({
      userId: user._id,
    });
    if (student) {
      res.status(201).json({ _id: user._id, email: user.email });
    } else {
      res.status(400).json("Invalid user data");
    }
  } else {
    res.status(400).json("Invalid user data");
  }
});

//@desc Enrollment
//@route Post /api/student/enroll-course
//@access private
const enrollCourses = asyncHandler(async (req, res) => {
  console.log("Enroll Courses");
  const { courseCode, email } = req.body;
  if (!courseCode) {
    res.status(400).json({ error: "Course Code is required" });
  }

  if (!email) {
    res.status(400).json({ error: "Email is required" });
  }

  const course = await Course.findOne({ code: courseCode });
  const user = await User.findOne({ email: email });

  if (!course) {
    res.status(400).json({ error: "Course not found" });
  }

  if (!user) {
    res.status(400).json({ error: "User not found" });
  }
  const student = await Student.findOne({ userId: user._id });

  if (!student) {
    res.status(400).json({ error: "Student not found" });
  }
  student.courses.push(course._id);
  await student.save();
  res.status(200).json({ message: "Course Enrolled" });
});


//@desc View Time table
//@route Post /api/student/view-time-table
//@access private
const viewTimeTable = asyncHandler(async (req, res) => {
  console.log("View Time Table");
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is required" });
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).json({ error: "User not found" });
  }
  const student = await Student.findOne({ userId: user._id });
  
  if (!student) {
    res.status(400).json({ error: "Student not found" });
  }
  const courses = student.courses;
  const classSessions = [];
  console.log(courses);
  for (let i = 0; i < courses.length; i++) {
    console.log(courses[i]._id);
    const sessions = await ClassSession.find({ course: courses[i]._id });
    console.log(sessions);
    classSessions.push(sessions);
  }
  res.status(200).json({ classSessions });
});
module.exports = { registerStudent, enrollCourses, viewTimeTable };
