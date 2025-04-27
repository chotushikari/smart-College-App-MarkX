const express = require("express");
const router = express.Router();

const { markAttendance } = require("../controllers/facultyAttendance.controller");
const { editAttendance } = require("../controllers/attendanceEdit.controller");

// Placeholder controller
const getTodaysSchedule = (req, res) => {
  res.status(200).json({ message: "Today's schedule fetched (placeholder)" });
};

router.get("/schedule/today", getTodaysSchedule);
router.post("/attendance/mark", markAttendance);
router.put("/attendance/edit", editAttendance);

module.exports = router;
