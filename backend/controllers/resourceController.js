const asyncHandler = require("express-async-handler");
const Resource = require("../models/resourceModel");

//@desc Get all Resources
//@route GET /api/resource
//@access public
const getResources = asyncHandler(async (req, res) => {
    const resource = await Resource.find();
    res.status(200).json(resource);
});


//@desc Create new Resource
//@route POST /api/resource
//@access public
const createResources = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { resourceCode, resourceType } = req.body;
    try {
    if (!resourceCode || !resourceType) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }

    const resorce = await Resource.create({
        resourceCode,
        resourceType
      });

    res.status(201).json( resorce );

    }catch (error) {
    res.status(400).json({
      message: "Resorce Not Created!",
      error: error.message,
    });
  }
});



module.exports = {getResources, createResources};