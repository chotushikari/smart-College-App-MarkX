const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

// Send notification when attendance is marked
router.post("/send-attendance", notificationController.sendAttendanceNotification);

// Send notification when a new chat message is posted
router.post("/send-chat", notificationController.sendChatNotification);

// Send notification when the schedule is updated
router.post("/send-schedule-update", notificationController.sendScheduleUpdateNotification);

module.exports = router;
