const express = require("express");
const router = express.Router();
const { getStudentAttendanceStats } = require("../controllers/analytics.controller");

router.get("/student/:studentId", getStudentAttendanceStats);

module.exports = router;

