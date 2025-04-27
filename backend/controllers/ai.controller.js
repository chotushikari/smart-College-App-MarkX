// backend/controllers/ai.controller.js
const { db } = require("../firebase");
const { Timestamp } = require("firebase-admin/firestore");

exports.chatWithBot = async (req, res) => {
  const { studentId, message } = req.body;

  if (!studentId || !message) {
    return res.status(400).json({ error: "Student ID and message required" });
  }

  try {
    const lowerMsg = message.toLowerCase();

    // 1. Attendance insight
    if (lowerMsg.includes("attendance")) {
      const attendanceSnapshot = await db
        .collection("attendance")
        .where("studentId", "==", studentId)
        .get();

      let total = 0, present = 0;
      attendanceSnapshot.forEach(doc => {
        total++;
        if (doc.data().status === "present") present++;
      });

      const percent = ((present / total) * 100).toFixed(2);
      return res.json({ reply: `📊 Your attendance is ${percent}% (${present}/${total}).` });
    }

    // 2. Missed classes count
    if (lowerMsg.includes("how many times") || lowerMsg.includes("missed")) {
      const attendanceSnapshot = await db
        .collection("attendance")
        .where("studentId", "==", studentId)
        .where("status", "==", "absent")
        .get();

      return res.json({ reply: `🚫 You've missed ${attendanceSnapshot.size} classes so far.` });
    }

    // 3. Next class today
    if (lowerMsg.includes("next class") || lowerMsg.includes("schedule")) {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0]; // '2025-04-16'

      const scheduleSnapshot = await db
        .collection("schedules")
        .where("studentId", "==", studentId)
        .where("date", "==", todayStr)
        .orderBy("startTime")
        .get();

      if (scheduleSnapshot.empty) {
        return res.json({ reply: "📅 You don't have any classes today." });
      }

      // Get current time to find next
      const now = Timestamp.now().toDate();
      const nextClass = scheduleSnapshot.docs.find(doc => doc.data().startTime.toDate() > now);

      if (nextClass) {
        const cls = nextClass.data();
        return res.json({
          reply: `🕒 Your next class is "${cls.subject}" at ${cls.startTime.toDate().toLocaleTimeString()}.`,
        });
      } else {
        return res.json({ reply: "🎉 You're done with classes for today!" });
      }
    }

    // Default fallback
    return res.json({
      reply: "🤖 I'm here to help! You can ask things like:\n- What’s my attendance?\n- When is my next class?\n- How many classes did I miss?",
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Bot failed to respond" });
  }
};
