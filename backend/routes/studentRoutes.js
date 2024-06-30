const express = require("express");
const {
  registerStudent,
  enrollCourses,
  viewTimeTable,
} = require("../controllers/studentController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRole = require("../middleware/authorization");

const router = express.Router();

router.post("/register",validateToken,authorizeRole("Admin"),registerStudent);

router.post("/enroll-course",validateToken,authorizeRole("Faculty"),enrollCourses);

router.post("/view-time-table",validateToken,authorizeRole("Student"),viewTimeTable);

module.exports = router;
