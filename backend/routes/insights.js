const express = require("express");
const router = express.Router();
const { getAttendanceInsights } = require("../controllers/insights.controller");

router.get("/:studentId", getAttendanceInsights);

module.exports = router;
