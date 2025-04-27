import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

const mockAssignments = [
  {
    title: "DSA Assignment 3",
    due: "April 22, 2025",
    status: "Pending",
  },
  {
    title: "OS Lab Report",
    due: "April 24, 2025",
    status: "Submitted",
  },
  {
    title: "AI Case Study",
    due: "April 26, 2025",
    status: "Pending",
  },
];

const AssignmentCard = () => {
  return (
    <div className="glass-card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <FaClipboardList className="text-purple-500" /> Upcoming Assignments
      </h2>
      <ul className="space-y-3">
        {mockAssignments.map((a, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded bg-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{a.title}</p>
              <p className="text-xs text-gray-500">Due: {a.due}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                a.status === "Submitted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {a.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentCard;
