// 📁 backend/routes/timetable.route.js
const express = require("express");
const router = express.Router();
const {
  createOrUpdateTimetable,
  getTimetableByClassId,
  autoGenerateTimetable,
} = require("../controllers/timetable.controller");


const { isAdminOrFaculty } = require("../middlewares/roleCheck");

// 🔐 Only Admin or Faculty can create or auto-generate
router.post("/:classId",  isAdminOrFaculty, createOrUpdateTimetable);

// 📅 Get timetable (Student/Faculty/Admin)
router.get("/:classId",  getTimetableByClassId);

// 🤖 Auto-generate timetable (Admin or Faculty only)
router.post("/generate/:classId",  isAdminOrFaculty, autoGenerateTimetable);


module.exports = router;
