import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentAttendance = () => {
  const [course, setCourse] = useState("");
  const [mode, setMode] = useState("button"); // Default
  const email = "student@du.ac.in"; // You’ll fetch from auth later

  const markAttendance = async (status) => {
    try {
      const res = await axios.post("http://localhost:5000/api/attendance/mark", {
        email,
        course,
        status,
        mode,
        markedBy: null, // Student marks self
      });
      toast.success("Attendance marked successfully!");
    } catch (err) {
      toast.error("Failed to mark attendance.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Mark Your Attendance</h2>

      <input
        type="text"
        placeholder="Enter course name"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />

      <div className="mb-4">
        <label className="mr-2">Select Mode:</label>
        <select onChange={(e) => setMode(e.target.value)} value={mode}>
          <option value="button">Button</option>
          <option value="swipe">Swipe</option>
        </select>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 mr-4 rounded"
        onClick={() => markAttendance("present")}
      >
        Present
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => markAttendance("absent")}
      >
        Absent
      </button>
    </div>
  );
};

export default StudentAttendance;
