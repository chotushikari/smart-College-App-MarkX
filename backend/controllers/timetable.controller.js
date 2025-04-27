// 📁 backend/controllers/timetable.controller.js
const { db } = require("../firebase");
const generateTimetable = require("../utils/timetableGenerator");


exports.generateClassTimetable = async (req, res) => {
  const { classId } = req.params;

  try {
    const timetable = await generateTimetable(classId);
    res.status(200).json({ success: true, timetable });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// 🔐 Create or Update a timetable manually (Admin or Faculty)
exports.createOrUpdateTimetable = async (req, res) => {
  const { classId } = req.params;
  const { timetable } = req.body;

  if (!timetable) return res.status(400).json({ error: "Timetable is required" });

  try {
    await db.collection("classes").doc(classId).set({ timetable }, { merge: true });
    return res.status(200).json({ success: true, message: "Timetable updated" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update timetable", details: err.message });
  }
};

// 📅 Get Timetable for a class
exports.getTimetableByClassId = async (req, res) => {
  const { classId } = req.params;

  try {
    const classDoc = await db.collection("classes").doc(classId).get();
    if (!classDoc.exists) return res.status(404).json({ error: "Class not found" });

    const { timetable } = classDoc.data();
    return res.status(200).json(timetable || {});
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch timetable", details: err.message });
  }
};

// 🤖 Auto-generate timetable using AI logic
exports.autoGenerateTimetable = async (req, res) => {
  const { classId } = req.params;
  const { subjects, facultyAvailability } = req.body;

  if (!subjects || !facultyAvailability) {
    return res.status(400).json({ error: "Missing required inputs for generation" });
  }

  try {
    const generatedTimetable = generateTimetable(subjects, facultyAvailability);

    await db.collection("classes").doc(classId).set({ timetable: generatedTimetable }, { merge: true });

    return res.status(200).json({ success: true, timetable: generatedTimetable });
  } catch (err) {
    return res.status(500).json({ error: "Auto-generation failed", details: err.message });
  }
};
