const Attendance = require("../models/Attendance");

// GET /api/analytics/student/:studentId
exports.getStudentAttendanceStats = async (req, res) => {
  const { studentId } = req.params;

  try {
    const records = await Attendance.find({ studentId });
    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const absent = total - present;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    const subjectWise = {};
    records.forEach(record => {
      if (!subjectWise[record.subject]) {
        subjectWise[record.subject] = { total: 0, present: 0 };
      }
      subjectWise[record.subject].total++;
      if (record.status === "present") subjectWise[record.subject].present++;
    });

    const subjectStats = Object.entries(subjectWise).map(([subject, stats]) => ({
      subject,
      total: stats.total,
      present: stats.present,
      percentage: ((stats.present / stats.total) * 100).toFixed(2)
    }));

    res.status(200).json({
      totalDays: total,
      present,
      absent,
      percentage,
      subjectStats
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stats", details: err.message });
  }
};
