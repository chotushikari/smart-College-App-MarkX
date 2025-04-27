// backend/controllers/insights.controller.js
const { db } = require("../firebase");

exports.getAttendanceInsights = async (req, res) => {
  const { studentId } = req.params;

  try {
    const snapshot = await db
      .collection("attendance")
      .where("studentId", "==", studentId)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No attendance found" });
    }

    let total = 0;
    let present = 0;
    let absentDays = {};
    let attendanceRecords = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      total++;
      attendanceRecords.push(data);

      if (data.status === "present") {
        present++;
      } else {
        const day = data.timestamp.toDate().toLocaleDateString("en-IN", { weekday: 'long' });
        absentDays[day] = (absentDays[day] || 0) + 1;
      }
    });

    const percentage = ((present / total) * 100).toFixed(2);

    // Suggestion engine (basic pattern detection)
    const mostMissedDay = Object.keys(absentDays).reduce((a, b) => absentDays[a] > absentDays[b] ? a : b, null);

    const suggestions = [];
    if (percentage < 75) suggestions.push("⚠️ You’re at risk of falling below minimum attendance!");
    if (mostMissedDay) suggestions.push(`📉 You often miss classes on **${mostMissedDay}**.`);

    res.status(200).json({
      studentId,
      total,
      present,
      percentage,
      suggestions,
      risk: percentage < 75,
    });
  } catch (err) {
    console.error("Error getting insights:", err);
    res.status(500).json({ error: "Error fetching insights" });
  }
};
