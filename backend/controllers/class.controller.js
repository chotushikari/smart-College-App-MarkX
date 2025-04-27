// backend/controllers/class.controller.js
const { db } = require("../firebase");
const { Timestamp } = require("firebase-admin/firestore");

// Create Class Controller
exports.createClass = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: "Name and code are required" });
    }

    const existingClassSnapshot = await db
      .collection("classes")
      .where("code", "==", code)
      .get();

    if (!existingClassSnapshot.empty) {
      return res.status(409).json({ error: "Class with this code already exists" });
    }

    const newClass = {
      name,
      code,
      facultyIds: [],
      studentIds: [],
      createdAt: Timestamp.now(),
    };

    const classRef = await db.collection("classes").add(newClass);

    res.status(201).json({
      message: "Class created successfully",
      id: classRef.id,
      class: newClass,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Failed to create class" });
  }
};

// ✅ Get All Classes Controller
exports.getAllClasses = async (req, res) => {
  try {
    const snapshot = await db.collection("classes").get();
    const classes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

// ✅ Get Class Details by ID Controller
exports.getClassDetails = async (req, res) => {
  try {
    const { classId } = req.params;
    const doc = await db.collection("classes").doc(classId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ message: "Failed to fetch class details" });
  }
};

// PUT /api/classes/:classId
exports.editClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { name, code } = req.body;

    const classRef = db.collection("classes").doc(classId);
    const doc = await classRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Class not found" });
    }

    await classRef.update({ name, code });
    res.status(200).json({ message: "Class updated successfully" });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Failed to update class" });
  }
};


// DELETE /api/classes/:classId
exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    await db.collection("classes").doc(classId).delete();
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Failed to delete class" });
  }
};


// PATCH /api/classes/:classId/assign
exports.assignUsersToClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { facultyIds = [], studentIds = [] } = req.body;

    const classRef = db.collection("classes").doc(classId);
    const doc = await classRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Class not found" });
    }

    await classRef.update({ facultyIds, studentIds });
    res.status(200).json({ message: "Users assigned successfully" });
  } catch (error) {
    console.error("Error assigning users:", error);
    res.status(500).json({ message: "Failed to assign users to class" });
  }
};


// ✅ Add members to a class (facultyIds or studentIds)
// ✅ Add a single student to a class
exports.addMembersToClass = async (req, res) => {
  const { classId } = req.params;
  const studentId = req.query.studentId; // Get studentId from the query string

  try {
    // Validate input
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Check if class exists
    const classRef = db.collection("classes").doc(classId);
    const classDoc = await classRef.get();

    if (!classDoc.exists) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Add the student to the class
    await classRef.update({
      studentIds: admin.firestore.FieldValue.arrayUnion(studentId),
    });

    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student to class:", error);
    res.status(500).json({ message: "Failed to add student to class" });
  }
};



// ✅ Remove members from a class (facultyIds or studentIds)
exports.removeMembersFromClass = async (req, res) => {
  const { classId } = req.params;
  const { facultyIds = [], studentIds = [] } = req.body;

  try {
    const classRef = db.collection("classes").doc(classId);
    const classDoc = await classRef.get();

    if (!classDoc.exists) {
      return res.status(404).json({ message: "Class not found" });
    }

    await classRef.update({
      facultyIds: admin.firestore.FieldValue.arrayRemove(...facultyIds),
      studentIds: admin.firestore.FieldValue.arrayRemove(...studentIds),
    });

    res.status(200).json({ message: "Members removed successfully" });
  } catch (error) {
    console.error("Error removing members:", error);
    res.status(500).json({ message: "Failed to remove members" });
  }
};


