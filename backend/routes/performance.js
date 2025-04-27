const express = require("express");
const router = express.Router();
const { predictPerformance, getPerformance } = require("../controllers/performance.controller");

const { isAdminOrFaculty } = require("../middlewares/rolecheck");

// POST: Predict student performance
router.post("/:studentId/predict",  isAdminOrFaculty, predictPerformance);

// GET: Fetch prediction data
router.get("/:studentId",  getPerformance);

module.exports = router;
