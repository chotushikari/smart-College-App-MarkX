const { sendFCMNotification } = require("../utils/fcm.utils");  // Import helper function for FCM
const { db, Timestamp } = require("../firebase");

// Send Notification when Attendance is marked
exports.sendAttendanceNotification = async (req, res) => {
  const { studentId, status, fcmToken } = req.body;

  if (!studentId || !status || !fcmToken) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const message = status === 'present' 
      ? `Your attendance has been marked as present.`
      : `Your attendance has been marked as absent.`;

    // Send the notification
    await sendFCMNotification(fcmToken, "Attendance Update", message);
    res.status(200).json({ success: true, message: "Notification sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification", details: err.message });
  }
};

// Send Notification when a new message is sent in the chat
exports.sendChatNotification = async (req, res) => {
  const { classId, message, senderId, fcmTokens } = req.body;

  if (!classId || !message || !senderId || !fcmTokens) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const chatMessage = `${senderId}: ${message}`;
    // Send notifications to all tokens
    for (const token of fcmTokens) {
      await sendFCMNotification(token, "New Chat Message", chatMessage);
    }

    res.status(200).json({ success: true, message: "Notifications sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notifications", details: err.message });
  }
};

// Send Notification when the schedule is updated
exports.sendScheduleUpdateNotification = async (req, res) => {
  const { classId, scheduleId, fcmTokens } = req.body;

  if (!classId || !scheduleId || !fcmTokens) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const message = `Your class schedule has been updated. Please check for new timings.`;

    // Send notifications to all tokens
    for (const token of fcmTokens) {
      await sendFCMNotification(token, "Schedule Update", message);
    }

    res.status(200).json({ success: true, message: "Notifications sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notifications", details: err.message });
  }
};
