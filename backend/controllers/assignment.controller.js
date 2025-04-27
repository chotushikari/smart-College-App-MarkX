const { db, admin } = require("../firebase");
const { v4: uuidv4 } = require("uuid");

exports.createAssignment = async (req, res) => {
  const { classId } = req.params;
  const { title, description, deadline, createdBy } = req.body;

  try {
    const assignmentId = uuidv4();
    await db.collection("classes")
      .doc(classId)
      .collection("assignments")
      .doc(assignmentId)
      .set({
        assignmentId,
        title,
        description,
        deadline: new Date(deadline),
        createdBy,
        createdAt: new Date()
      });

    res.status(201).json({ success: true, assignmentId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create assignment", details: err.message });
  }
};

exports.submitAssignment = async (req, res) => {
  const { classId, assignmentId } = req.params;
  const { studentId, fileUrl, fileName } = req.body;

  try {
    const submission = {
      studentId,
      fileUrl,
      fileName,
      submittedAt: new Date(),
    };

    const assignmentDoc = await db.collection("classes").doc(classId)
      .collection("assignments").doc(assignmentId).get();

    if (!assignmentDoc.exists) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const deadline = assignmentDoc.data().deadline.toDate();
    submission.late = new Date() > deadline;

    await db.collection("classes").doc(classId)
      .collection("assignments").doc(assignmentId)
      .collection("submissions").doc(studentId)
      .set(submission);

    res.status(200).json({ success: true, late: submission.late });
  } catch (err) {
    res.status(500).json({ error: "Submission failed", details: err.message });
  }
};

exports.getClassAssignments = async (req, res) => {
  const { classId } = req.params;

  try {
    const snapshot = await db.collection("classes").doc(classId)
      .collection("assignments").orderBy("createdAt", "desc").get();

    const assignments = snapshot.docs.map(doc => doc.data());

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assignments", details: err.message });
  }
};

exports.getAssignmentSubmissions = async (req, res) => {
  const { classId, assignmentId } = req.params;

  try {
    const snapshot = await db.collection("classes").doc(classId)
      .collection("assignments").doc(assignmentId)
      .collection("submissions").get();

    const submissions = snapshot.docs.map(doc => doc.data());

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching submissions", details: err.message });
  }
};
