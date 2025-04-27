const express = require("express");
const router = express.Router();
const {
  createAssignment,
  submitAssignment,
  getClassAssignments,
  getAssignmentSubmissions
} = require("../controllers/assignment.controller");


router.post("/:classId/create",  createAssignment);
router.post("/:classId/:assignmentId/submit",  submitAssignment);
router.get("/:classId/all",  getClassAssignments);
router.get("/:classId/:assignmentId/submissions",  getAssignmentSubmissions);

module.exports = router;
