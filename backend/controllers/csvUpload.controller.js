// backend/controllers/csvUpload.controller.js
const { db } = require("../firebase");
const csv = require("csv-parser");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  const { classId } = req.params;
  const results = [];

  try {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const batch = db.batch();

        results.forEach((student) => {
          const studentRef = db
            .collection("classes")
            .doc(classId)
            .collection("students")
            .doc(student.email);

          batch.set(studentRef, {
            name: student.name,
            email: student.email,
            rollNumber: student.rollNumber,
            attendance: {},
            createdAt: new Date(),
          });
        });

        await batch.commit();
        res.status(200).json({ message: "Students uploaded successfully", count: results.length });
      });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).json({ message: "CSV upload failed" });
  }
};
