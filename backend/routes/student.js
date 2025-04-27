const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/attendance/today", studentController.getTodaysAttendance);
router.get("/class/schedule", studentController.getSchedule);
router.get("/class/chat", studentController.getClassChat);

module.exports = router;
