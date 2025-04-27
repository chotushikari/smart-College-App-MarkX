import React from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

const mockNotifications = [
  {
    id: 1,
    title: "Assignment Due",
    message: "Your DSA assignment is due tomorrow.",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title: "New Announcement",
    message: "OS class has been rescheduled to 3 PM.",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title: "Event Alert",
    message: "AI Seminar today at 4 PM in Seminar Hall.",
    time: "1 day ago",
  },
];

const NotificationCard = () => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <FaBell className="text-yellow-500" /> Notifications
      </h2>
      <div className="space-y-3">
        {mockNotifications.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md"
          >
            <h3 className="font-semibold text-indigo-600">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.message}</p>
            <p className="text-xs text-gray-400 mt-1">{note.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
