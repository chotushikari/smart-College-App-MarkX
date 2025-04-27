import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const AttendanceSummaryCard = ({ attendance = 82 }) => {
  const status =
    attendance >= 75
      ? "Good"
      : attendance >= 60
      ? "Warning"
      : "Low";

  const color =
    status === "Good"
      ? "text-green-600"
      : status === "Warning"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 bg-white rounded-lg shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Attendance Overview
        </h2>
        <span
          className={`text-sm font-semibold ${color}`}
        >
          {status}
        </span>
      </div>
      <div className="text-4xl font-bold text-indigo-600">
        {attendance}%
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Based on this month’s records.
      </p>
    </motion.div>
  );
};

export default AttendanceSummaryCard;
