// backend/controllers/facultyAttendance.controller.js
const { db } = require("../firebase");
const { Timestamp } = require("firebase-admin/firestore");

exports.markAttendance = async (req, res) => {
  try {
    const { classId, students } = req.body; // students = [{ studentId, status }]
    const facultyId = req.user.uid; // from auth middleware

    if (!classId || !students || !Array.isArray(students)) {
      return res.status(400).json({ error: "Class ID and students list are required" });
    }

    const dateKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const batch = db.batch();
    const attendanceRef = db.collection("attendance").doc();

    batch.set(attendanceRef, {
      classId,
      facultyId,
      students,
      markedAt: Timestamp.now(),
      date: dateKey,
    });

    for (const student of students) {
      const studentAttendanceRef = db
        .collection("classes")
        .doc(classId)
        .collection("students")
        .doc(student.studentId);

      batch.update(studentAttendanceRef, {
        [`attendance.${dateKey}`]: student.status,
      });
    }

    await batch.commit();

    res.status(200).json({ message: "Attendance marked successfully", attendanceId: attendanceRef.id });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};
