// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase/Firebase.js";

// const FacultyAttendance = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [isSwipeMode, setIsSwipeMode] = useState(false);
//   const [date, setDate] = useState("");
//   const [course, setCourse] = useState("");
//   const facultyEmail = localStorage.getItem("email");

//   useEffect(() => {
//     // Replace with real API call to fetch students of selected course
//     const fetchStudents = async () => {
//       const dummy = [
//         { _id: "1", name: "John Doe", email: "john@du.ac.in" },
//         { _id: "2", name: "Jane Smith", email: "jane@du.ac.in" },
//       ];
//       setStudents(dummy);
//     };
//     fetchStudents();
//   }, [course]);

//   const handleStatusChange = (id, status) => {
//     setAttendance((prev) => ({ ...prev, [id]: status }));
//   };

//   const submitAttendance = async () => {
//     if (!course || !date) return toast.error("Please select course and date");
//     try {
//       const attendanceData = Object.entries(attendance).map(([id, status]) => {
//         const student = students.find((s) => s._id === id);
//         return {
//           student: student.name,
//           email: student.email,
//           status,
//           course,
//           date,
//           markedBy: facultyEmail,
//           mode: isSwipeMode ? "swipe" : "button",
//         };
//       });

//       for (const entry of attendanceData) {
//         const docId = `${entry.email}_${course}_${date}`;
//         await setDoc(doc(db, "attendance", docId), entry);
//       }

//       toast.success("Attendance synced to Firestore ✅");
//     } catch (err) {
//       toast.error("Realtime sync failed ❌");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Faculty Attendance</h1>

//       <div className="flex gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Course Code (e.g., CSE101)"
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//       </div>

//       <button
//         onClick={() => setIsSwipeMode(!isSwipeMode)}
//         className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
//       >
//         {isSwipeMode ? "Switch to Button Mode" : "Switch to Swipe Mode"}
//       </button>

//       <div className="grid gap-4">
//         {students.map((student) => (
//           <motion.div
//             key={student._id}
//             whileHover={{ scale: 1.02 }}
//             className={`p-4 bg-white rounded-xl shadow flex justify-between items-center border cursor-pointer ${
//               isSwipeMode ? "hover:ring-2 hover:ring-indigo-300" : ""
//             }`}
//             onClick={() => {
//               if (isSwipeMode) {
//                 const current = attendance[student._id];
//                 const newStatus = current === "present" ? "absent" : "present";
//                 handleStatusChange(student._id, newStatus);
//               }
//             }}
//           >
//             <div className="text-left">
//               <p className="text-lg font-semibold">{student.name}</p>
//               <p className="text-sm text-gray-600">{student.email}</p>
//             </div>

//             {isSwipeMode ? (
//               <span
//                 className={`px-4 py-2 text-sm rounded-full font-medium ${
//                   attendance[student._id] === "present"
//                     ? "bg-green-100 text-green-700"
//                     : attendance[student._id] === "absent"
//                     ? "bg-red-100 text-red-700"
//                     : "bg-gray-100 text-gray-500"
//                 }`}
//               >
//                 {attendance[student._id] || "Unmarked"}
//               </span>
//             ) : (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleStatusChange(student._id, "present")}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     attendance[student._id] === "present"
//                       ? "bg-green-600"
//                       : "bg-green-400 hover:bg-green-500"
//                   }`}
//                 >
//                   <FaCheckCircle />
//                 </button>
//                 <button
//                   onClick={() => handleStatusChange(student._id, "absent")}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     attendance[student._id] === "absent"
//                       ? "bg-red-600"
//                       : "bg-red-400 hover:bg-red-500"
//                   }`}
//                 >
//                   <FaTimesCircle />
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       <button
//         onClick={submitAttendance}
//         className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow"
//       >
//         Submit Attendance
//       </button>
//     </div>
//   );
// };

// export default FacultyAttendance;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/Firebase.js";

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
  const facultyEmail = localStorage.getItem("email");

  const location = useLocation();
  const classData = location.state || {};

  useEffect(() => {
    if (classData.course) setCourse(classData.course);
    if (classData.date) setDate(classData.date);
  }, [classData]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!course) return;
      try {
        const q = query(collection(db, "students"), where("course", "==", course));
        const querySnapshot = await getDocs(q);
        const studentList = [];
        querySnapshot.forEach((doc) => {
          studentList.push({ _id: doc.id, ...doc.data() });
        });
        setStudents(studentList);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    fetchStudents();
  }, [course]);

  const handleStatusChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const submitAttendance = async () => {
    if (!course || !date) return toast.error("Please select course and date");
    try {
      const attendanceData = Object.entries(attendance).map(([id, status]) => {
        const student = students.find((s) => s._id === id);
        return {
          student: student.name,
          email: student.email,
          status,
          course,
          date,
          markedBy: facultyEmail,
          mode: isSwipeMode ? "swipe" : "button",
        };
      });

      for (const entry of attendanceData) {
        const docId = `${entry.email}_${course}_${date}`;
        await setDoc(doc(db, "attendance", docId), entry);
      }

      toast.success("Attendance synced to Firestore ✅");
    } catch (err) {
      toast.error("Realtime sync failed ❌");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Faculty Attendance</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Course Code (e.g., CSE101)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <button
        onClick={() => setIsSwipeMode(!isSwipeMode)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
      >
        {isSwipeMode ? "Switch to Button Mode" : "Switch to Swipe Mode"}
      </button>

      <div className="grid gap-4">
        {students.map((student) => (
          <motion.div
            key={student._id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 bg-white rounded-xl shadow flex justify-between items-center border cursor-pointer ${
              isSwipeMode ? "hover:ring-2 hover:ring-indigo-300" : ""
            }`}
            onClick={() => {
              if (isSwipeMode) {
                const current = attendance[student._id];
                const newStatus = current === "present" ? "absent" : "present";
                handleStatusChange(student._id, newStatus);
              }
            }}
          >
            <div className="text-left">
              <p className="text-lg font-semibold">{student.name}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>

            {isSwipeMode ? (
              <span
                className={`px-4 py-2 text-sm rounded-full font-medium ${
                  attendance[student._id] === "present"
                    ? "bg-green-100 text-green-700"
                    : attendance[student._id] === "absent"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {attendance[student._id] || "Unmarked"}
              </span>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(student._id, "present")}
                  className={`px-4 py-2 rounded-lg text-white ${
                    attendance[student._id] === "present"
                      ? "bg-green-600"
                      : "bg-green-400 hover:bg-green-500"
                  }`}
                >
                  <FaCheckCircle />
                </button>
                <button
                  onClick={() => handleStatusChange(student._id, "absent")}
                  className={`px-4 py-2 rounded-lg text-white ${
                    attendance[student._id] === "absent"
                      ? "bg-red-600"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                >
                  <FaTimesCircle />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={submitAttendance}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default FacultyAttendance;