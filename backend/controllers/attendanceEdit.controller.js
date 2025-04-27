// backend/controllers/attendanceEdit.controller.js
const { db } = require("../firebase");

exports.editAttendance = async (req, res) => {
  try {
    const { classId, studentId, date, status } = req.body;

    if (!classId || !studentId || !date || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const studentRef = db
      .collection("classes")
      .doc(classId)
      .collection("students")
      .doc(studentId);

    await studentRef.update({
      [`attendance.${date}`]: status,
    });

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error editing attendance:", error);
    res.status(500).json({ message: "Failed to update attendance" });
  }
};
