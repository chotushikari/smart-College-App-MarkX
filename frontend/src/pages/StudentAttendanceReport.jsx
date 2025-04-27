import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const StudentAttendanceReport = () => {
  const [records, setRecords] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const q = query(collection(db, "attendance"), where("email", "==", email));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setRecords(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Attendance Records</h1>
      <div className="grid gap-4">
        {records.map((rec, i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow border">
            <p className="text-lg font-semibold">Course: {rec.course}</p>
            <p>Date: {rec.date}</p>
            <p>Status: <span className={
              rec.status === "present" ? "text-green-600" : "text-red-600"
            }>{rec.status}</span></p>
            <p>Mode: {rec.mode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAttendanceReport;
