import React from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

const mockSchedule = [
  {
    id: "cls001",
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "CSE-204",
    faculty: "Dr. Sharma",
  },
  {
    id: "cls002",
    subject: "Operating Systems",
    time: "12:00 PM - 1:00 PM",
    room: "CSE-105",
    faculty: "Prof. Mehta",
  },
  {
    id: "cls003",
    subject: "AI in Education",
    time: "2:30 PM - 3:30 PM",
    room: "Lab-3",
    faculty: "Dr. Kaur",
  },
];

const TodaysSchedule = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaClock className="text-blue-500" /> Today’s Schedule -{" "}
        <span className="text-sm text-gray-500">{today}</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {mockSchedule.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white border shadow rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-indigo-600">
                {cls.subject}
              </h3>
              <p className="text-sm text-gray-600">👨‍🏫 {cls.faculty}</p>
            </div>
            <p className="text-sm text-gray-700">⏰ {cls.time}</p>
            <p className="text-sm text-gray-500">📍 Room: {cls.room}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSchedule;
