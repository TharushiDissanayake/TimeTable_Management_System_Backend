const express = require("express");
const router = express.Router();
const { 
    getClassSessions, 
    createClassSession, 
    getClassSession, 
    updateClassSession, 
    deleteClassSession,
    checkAvailabilty 
} = require("../controllers/classSessionController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRole = require("../middleware/authorization");

router.use(validateToken)
router.route("/").get(authorizeRole("Admin"),getClassSessions).post(authorizeRole("Admin"), createClassSession);
router.route("/:id").get(authorizeRole("Admin"), getClassSession).put(authorizeRole("Admin"), updateClassSession).delete(authorizeRole("Admin"), deleteClassSession);
router.route("/check_availability").post(checkAvailabilty);

module.exports = router;