const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/user");

// POST /api/attendance/mark
router.post("/mark", async (req, res) => {
  const { email, course, status, mode, markedBy } = req.body;

  try {
    const student = await User.findOne({ email });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const attendance = new Attendance({
      student: student._id,
      course,
      status,
      mode,
      markedBy
    });

    await attendance.save();
    res.status(200).json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ error: "Attendance marking failed", details: err.message });
  }
});

module.exports = router;
