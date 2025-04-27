// src/components/AdminUploadCSV.jsx
import React, { useState } from "react";
import Papa from "papaparse";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const AdminUploadCSV = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [classId, setClassId] = useState("");

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!csvFile || !classId) {
      alert("Please select a CSV file and enter a class ID.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const students = results.data;
        const batch = students.map((student) => {
          const studentRef = doc(db, "classes", classId, "students", student.id);
          return setDoc(studentRef, {
            name: student.name,
            email: student.email,
            rollNumber: student.rollNumber,
          });
        });
        try {
          await Promise.all(batch);
          alert("Students uploaded successfully!");
        } catch (error) {
          console.error("Error uploading students:", error);
          alert("Failed to upload students.");
        }
      },
    });
  };

  return (
    <div>
      <h2>Upload Students CSV</h2>
      <input
        type="text"
        placeholder="Enter Class ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AdminUploadCSV;
