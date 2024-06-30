const asyncHandler = require("express-async-handler");
const ClassSession = require("../models/classSessionModel");
const Faculty = require("../models/facultyModel");
const Resource = require("../models/resourceModel");
const Course = require("../models/courseModel");
const calculateSlotsDuringTime = require("../util/Slots");
const ResourceAvailability = require("../models/resourceAvailabilityModel");

//@desc Get all sessions
//@route Get /api/classSession
//@access public
const getClassSessions = asyncHandler(async (req, res) => {
    const ClassSessions = await ClassSession.find();
    res.status(200).json(ClassSessions);
});

//@desc Get ClassSessions
//@route Get /api/classSessions/:id
//@access public
const getClassSession = asyncHandler(async (req, res) => {
    try {
        console.log("Hi");
        const classSessions = await ClassSession.find({ batch: req.params.id });
        
        if (classSessions.length === 0) {
            res.status(404);
            throw new Error("Class Sessions not found for the provided batch ID");
        }
        
        res.status(200).json(classSessions);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve class sessions",
            error: error.message,
        });
    }
});


//@desc Create new class session
//@route POST /api/classSessions
//@access public
const createClassSession = asyncHandler(async (req, res) => {
    // console.log("The request body is: ", req.body);
    const { batch, courseName, day, startTime, endTime, facultyName, location} = req.body;
    console.log("Hi"+ batch);

    if (!batch || !courseName || !day || !startTime || !endTime || !facultyName || !location ) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }

    const faculty = await Faculty.findOne({ facultyName: facultyName });
    const resource = await Resource.findOne({ resourceCode: location });
    const course = await Course.findOne({ name: courseName });
    console.log(faculty);
    if (!faculty || !resource || !course) {
        res.status(400);
        if (!faculty) {
            throw new Error("Entered faculty name is wrong");
        }
        if (!resource) {
            throw new Error("Entered resorce code is wrong");
        }
        if (!course) {
            throw new Error("Entered cource name is wrong");
        }
    }
    
    if (course.faculty.toString() != faculty._id.toString()) {
        console.log(course.faculty + " " + faculty._id);
        res.status(400);
        throw new Error("You entered Courses code is not relavant to faculty");
    }

    console.log(startTime);
    const slots = calculateSlotsDuringTime(startTime, endTime, 30);

    for (const slot of slots) {
        const checkAvailabilty = await ResourceAvailability.findOne({
          resourceCode: resource._id,
          day: day,
          slot: slot,
        });
    
        if (checkAvailabilty) {
          res.status(400);
          throw new Error("Already booked. please try another time slot");
        }
    }

    const slotIds = [];
    console.log(slots);
    for (const slot of slots) {
        console.log(day);
        try {
        const booking = await ResourceAvailability.create({
            resourceCode: resource._id,
            day: day,
            slot: slot,
        });
        console.log(booking);
        if (booking) {
            slotIds.push(booking._id);
        }
        } catch (error) {
        console.log(error);
        }
    }


    console.log(slotIds);
    const classSession = await ClassSession.create({
        batch,
        courseName: course._id,
        day,
        startTime,
        endTime,
        facultyName: faculty._id,
        location,
        slots: slotIds,
    });

    if (classSession) {
        res.status(201).json({
          _id: classSession._id,
          "Message": "Session Created",
        });
    } else {
    res.status(400);
    throw new Error("User data is not valid");
    }

});

const checkAvailabilty = asyncHandler(async (req, res) => {
    const { resourceCode, day, startTime, endTime } = req.body;
    console.log(req.body);
  
    if (!resourceCode || !day || !startTime || !endTime) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const resource = await Resource.findOne({ resourceCode: resourceCode });
    console.log(resource);
    if (!resource) {
      res.status(400);
      throw new Error("Wrong Resource number");
    }

    const slots = calculateSlotsDuringTime(startTime, endTime, 30);
    console.log("avilabilty" + slots);
    for (const slot of slots) {
        const checkAvailabilty = await ResourceAvailability.findOne({
        resourceCode: resource._id,
        day: day,
        slot: slot,
        });

    if (checkAvailabilty) {
      res.status(400);
      throw new Error("Already booked. please try another time slot");
    }
    res.status(200).json({
      message: "Resource is avilable",
      resource: resourceCode,
      startTime: startTime,
      endTime: endTime,
    });
    }

  });
  

//@desc Update Class Session
//@route PUT /api/classSessions/:id
//@access public
const updateClassSession = asyncHandler(async (req, res) => {
    try {
        const classSession = await ClassSession.findById(req.params.id);
        if (!classSession) {
            res.status(404);
            throw new Error("Class Session not Found");
        }

        const { batch, courseName, day, startTime, endTime, facultyName, location } = req.body;

        const course = await Course.findOne({ name: courseName });
        if (!course) {
            res.status(400);
            throw new Error("Invalid courseName");
        }

        const faculty = await Faculty.findOne({ facultyName });
        if (!faculty) {
            res.status(400);
            throw new Error("Invalid facultyName");
        }

        const resource = await Resource.findOne({ resourceCode: location });
        if (!resource) {
        return res.status(400).json({ error: "Invalid location" });
        }

        const newSlots = calculateSlotsDuringTime(startTime, endTime, 30);

    for (const slot of newSlots) {
      const checkAvailability = await ResourceAvailability.findOne({
        resourceCode: resource._id,
        day: day,
        slot: slot,
      });

      if (checkAvailability) {
        return res
          .status(400)
          .json({ error: "Slot already booked. Please try another time slot" });
      }
    }

        // Update classSession with the retrieved ObjectId values
        classSession.batch = batch;
        classSession.courseName = course._id;
        classSession.day = day;
        classSession.startTime = startTime;
        classSession.endTime = endTime;
        classSession.facultyName = faculty._id;
        classSession.location = location;

    // Remove previous slots
    await ResourceAvailability.deleteMany({ _id: { $in: classSession.slots } });
    const slotIds = [];


    for (const slot of newSlots) {
        console.log(day);
        try {
          const booking = await ResourceAvailability.create({
            resourceCode: resource._id,
            day: day,
            slot: slot,
          });
          console.log(booking);
          if (booking) {
            slotIds.push(booking._id);
          }
        } catch (error) {
          console.log(error);
        }
      }
      classSession.slots = slotIds;

        const updatedSession = await classSession.save();
        res.status(200).json({message: "Class Session Updated", updatedSession});
    } catch (error) {
        res.status(400).json({
            message: "Failed to update class session",
            error: error.message,
        });
    }
});


//@desc Delete Class Session
//@route DELETE /api/classSessions/:id
//@access public
const deleteClassSession = asyncHandler(async (req, res) => {
    const classSession = await ClassSession.findById(req.params.id);
    if (!classSession) {
        res.status(404);
        throw new Error("Class Session not found");
    }
    // Remove previous slots
    await ResourceAvailability.deleteMany({ _id: { $in: classSession.slots } });
    await ClassSession.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Class Session Deleted", classSession});
});

module.exports = {getClassSessions, getClassSession, createClassSession, checkAvailabilty, updateClassSession, deleteClassSession};