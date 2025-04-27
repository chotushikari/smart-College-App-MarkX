const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET /api/users?role=student | faculty
router.get("/", userController.getUsersByRole);

module.exports = router;
