const express = require("express");
const router = express.Router();
const { 
    getCourses, 
    createCourse, 
    getCourse, 
    updateCourse, 
    deleteCourse 
} = require("../controllers/courseController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRole = require("../middleware/authorization");

router.use(validateToken)
router.route("/").get(getCourses).post(authorizeRole("Admin"), createCourse);
router.route("/:id").get(getCourse).put(authorizeRole("Admin"), updateCourse).delete(authorizeRole("Admin"), deleteCourse);

module.exports = router;