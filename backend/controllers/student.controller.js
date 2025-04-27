const { db, Timestamp } = require("../firebase");

// ✅ Get Today's Attendance (Dummy logic – you can enhance this)
exports.getTodaysAttendance = async (req, res) => {
  const { classId, studentId } = req.query;

  if (!classId || !studentId) {
    return res.status(400).json({ error: "Missing classId or studentId" });
  }

  try {
    const studentDoc = await db
      .collection("classes")
      .doc(classId)
      .collection("students")
      .doc(studentId)
      .get();

    if (!studentDoc.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const attendance = studentDoc.data().attendance || {};
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const status = attendance[today] || "Absent";

    res.status(200).json({ date: today, status });
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    res.status(500).json({ error: "Could not fetch attendance" });
  }
};

// ✅ Get Student Class Schedule (from classes collection)
exports.getSchedule = async (req, res) => {
  const { classId } = req.query;

  if (!classId) {
    return res.status(400).json({ error: "Missing classId" });
  }

  try {
    const classDoc = await db.collection("classes").doc(classId).get();

    if (!classDoc.exists) {
      return res.status(404).json({ error: "Class not found" });
    }

    const data = classDoc.data();
    const schedule = data.schedule || [];

    res.status(200).json({ schedule });
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({ error: "Could not fetch schedule" });
  }
};

// ✅ Get Chat Messages for a Class
exports.getClassChat = async (req, res) => {
  const { classId } = req.query;

  if (!classId) {
    return res.status(400).json({ error: "Missing classId" });
  }

  try {
    const chatSnap = await db
      .collection("classes")
      .doc(classId)
      .collection("chat")
      .orderBy("timestamp", "asc")
      .get();

    const messages = chatSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Could not fetch chat" });
  }
};
