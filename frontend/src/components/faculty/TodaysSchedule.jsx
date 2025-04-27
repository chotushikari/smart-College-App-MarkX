// import React from 'react';

// const sampleSchedule = [
//   { time: '9:00 AM - 10:00 AM', subject: 'Data Structures', class: 'CSE-A' },
//   { time: '11:00 AM - 12:00 PM', subject: 'OS', class: 'IT-B' },
// ];

// const TodaysSchedule = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-gray-700">🗓️ Today’s Schedule</h2>
//       <div className="space-y-4">
//         {sampleSchedule.map((slot, idx) => (
//           <div
//             key={idx}
//             className="p-4 bg-white rounded-xl shadow hover:shadow-md border-l-4 border-blue-500 cursor-pointer"
//           >
//             <div className="text-sm text-gray-600">{slot.time}</div>
//             <div className="text-lg font-semibold text-gray-800">{slot.subject}</div>
//             <div className="text-sm text-gray-500">{slot.class}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodaysSchedule;

import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaCheckCircle, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockSchedule = [
  {
    id: "cls001",
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "CSE-204",
    code: "DSA101",
  },
  {
    id: "cls002",
    subject: "Operating Systems",
    time: "12:00 PM - 1:00 PM",
    room: "CSE-105",
    code: "OS102",
  },
  {
    id: "cls003",
    subject: "AI in Education",
    time: "2:30 PM - 3:30 PM",
    room: "Lab-3",
    code: "AIE301",
  },
];

const TodaysSchedule = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaClock className="text-blue-500" /> Today’s Schedule - <span className="text-sm text-gray-500">{today}</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {mockSchedule.map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-white shadow-md rounded-lg p-4 border hover:scale-[1.02] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-indigo-600">{cls.subject}</h3>
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">{cls.code}</span>
            </div>
            <p className="text-gray-600 text-sm">⏰ {cls.time}</p>
            <p className="text-gray-500 text-sm">📍 Room: {cls.room}</p>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/faculty/attendance/${cls.id}`)}
                className="btn-sm bg-green-100 text-green-700 hover:bg-green-200"
              >
                ✅ Take Attendance
              </button>
              <button
                onClick={() => navigate(`/faculty/class/${cls.id}/notes`)}
                className="btn-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              >
                📝 Notes
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSchedule;
