const express = require("express");
const router = express.Router();
const { 
    getFaculty,
    createFaculty 
} = require("../controllers/facultyController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRole = require("../middleware/authorization");

router.use(validateToken)

router.route("/").get(getFaculty).post(authorizeRole("Admin"),createFaculty);

module.exports = router;