// src/components/FacultyEditAttendance.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const FacultyEditAttendance = ({ classId, date }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const attendanceRef = doc(db, "attendance", `${date}_${classId}`);
      const attendanceSnap = await getDoc(attendanceRef);
      if (attendanceSnap.exists()) {
        setAttendanceData(attendanceSnap.data());
      }
    };

    const fetchStudents = async () => {
      const studentsRef = collection(db, "classes", classId, "students");
      const studentsSnap = await getDocs(studentsRef);
      const studentsList = studentsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };

    fetchAttendance();
    fetchStudents();
  }, [classId, date]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleSave = async () => {
    const attendanceRef = doc(db, "attendance", `${date}_${classId}`);
    try {
      await setDoc(attendanceRef, attendanceData);
      alert("Attendance updated successfully!");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance.");
    }
  };

  return (
    <div>
      <h2>Edit Attendance for {classId} on {date}</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <select
                  value={attendanceData[student.id]?.status || ""}
                  onChange={(e) => handleStatusChange(student.id, e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save Attendance</button>
    </div>
  );
};

export default FacultyEditAttendance;
