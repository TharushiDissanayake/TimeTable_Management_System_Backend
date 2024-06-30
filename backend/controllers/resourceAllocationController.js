const asyncHandler = require("express-async-handler");
const Resource = require("../models/resourceModel");
const ResourceAvailability = require("../models/resourceAvailabilityModel");

const bookResource = asyncHandler(async (req, res) => {
    const { code, day, slot } = req.body;
    console.log(req.body);
  
    if (!code || !day || !slot) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const resource = await Resource.findOne({ resourceCode: code });
    if (!resource) {
      res.status(400);
      throw new Error("Wrong Resource number");
    }
    console.log(resource);
    const checkResource = await ResourceAvailability.findOne({
      resourceCode: resource._id,
      day: day,
      slot: slot,
    });
    if (checkResource) {
      res.status(400);
      throw new Error("This resource already booked this time slot");
    }
  
    const resourceAvbt = await ResourceAvailability.create({
      resourceCode: resource._id,
      day,
      slot,
    });
    if (resourceAvbt) {
      res.status(201).json({
        _id: resource._id,
        name: resource.resourceCode,
        type: resource.resourceType,
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  });
  
  module.exports = { bookResource };