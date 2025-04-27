const express = require("express");
const router = express.Router();

const classController = require("../controllers/class.controller");

// Create a new class
router.post("/create", classController.createClass);

// Get all classes
router.get("/all", classController.getAllClasses);

// Get specific class by ID
router.get("/:classId", classController.getClassDetails);

module.exports = router;

// Edit class
router.put("/:classId", classController.editClass);

// Delete class
router.delete("/:classId", classController.deleteClass);

// Assign users
router.patch("/:classId/assign", classController.assignUsersToClass);


router.post("/:classId/add-members", classController.addMembersToClass);
router.post("/:classId/remove-members", classController.removeMembersFromClass);
// POST /api/classes/:classId/add-members?studentId=student123
router.post("/:classId/add-members", classController.addMembersToClass);
