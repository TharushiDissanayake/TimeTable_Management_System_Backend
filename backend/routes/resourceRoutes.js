const express = require("express");
const router = express.Router();
const { 
    getResources, 
    createResources
} = require("../controllers/resourceController");
const validateToken = require("../middleware/validateTokenHandler");
const authorizeRole = require("../middleware/authorization");

router.use(validateToken)
router.route("/").get(getResources).post(authorizeRole("Admin"), createResources);

module.exports = router;