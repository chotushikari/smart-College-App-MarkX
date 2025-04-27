// backend/controllers/studentAttendance.controller.js
const { db } = require("../firebase");

exports.getStudentAttendance = async (req, res) => {
  try {
    const { classId, studentId } = req.params;

    const studentRef = db
      .collection("classes")
      .doc(classId)
      .collection("students")
      .doc(studentId);

    const doc = await studentRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ attendance: doc.data().attendance || {} });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Could not fetch student attendance" });
  }
};
