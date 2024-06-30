const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const Faculty = require("../models/facultyModel");

//@desc Get all Courses
//@route Get /api/courses
//@access public
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
});

//@desc Get Course
//@route Get /api/courses/:id
//@access public
const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).json({ message: "Course not found"});
    }
    res.status(200).json(course);
});

//@desc Create new Course
//@route POST /api/courses
//@access public
const createCourse = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, code, description, credits, facultyUserName} = req.body;
    try {
    if (!name || !code || !description || !credits || !facultyUserName) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }

    const faculty = await Faculty.findOne({ facultyName: facultyUserName });
    console.log(faculty);
    if (!faculty) {
        res.status(400);
        throw new Error("Wrong Faculty");
    }
    const course = await Course.create({
        faculty: faculty._id,
        name,
        code,
        description,
        credits,
    });

      
    res.status(201).json( course );

    }catch (error) {
    res.status(400).json({
      message: "Course Not Created!",
      error: error.message,
    });
  }
});

//@desc Update Course
//@route PUT /api/courses/:id
//@access public
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).json({ message: "Course not found"});
    }

    const updateCourse = await Course.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true });
      res.status(200).json(updateCourse);
});

//@desc Delete Course
//@route DELETE /api/courses/:id
//@access public
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).json({ message: "Course not found"});
    }
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json(course);
});

module.exports = {getCourses, createCourse, getCourse, updateCourse, deleteCourse};