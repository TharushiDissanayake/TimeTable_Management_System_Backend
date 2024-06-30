const asyncHandler = require("express-async-handler");
const Faculty = require("../models/facultyModel");

//@desc Get all Faculty
//@route GET /api/faculty
//@access public
const getFaculty = asyncHandler(async (req, res) => {
    const faculty = await Faculty.find();
    res.status(200).json(faculty);
});


//@desc Create new Faculty
//@route POST /api/faculty
//@access public
const createFaculty = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { facultyName } = req.body;
    try {
    if (!facultyName) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }

    const faculty = await Faculty.create({
        facultyName
      });

    res.status(201).json( faculty );

    }catch (error) {
    res.status(400).json({
      message: "Faculty Not Created!",
      error: error.message,
    });
  }
});



module.exports = {getFaculty, createFaculty};