import React from "react";
import { FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const mockPerformance = [
  { subject: "Data Structures", score: 88 },
  { subject: "Operating Systems", score: 75 },
  { subject: "AI in Education", score: 92 },
];

const PerformanceCard = () => {
  return (
    <div className="glass-card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <FaChartLine className="text-blue-500" /> Performance Snapshot
      </h2>
      <ul className="space-y-3">
        {mockPerformance.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-700">{s.subject}</span>
            <span
              className={`font-semibold ${
                s.score >= 85
                  ? "text-green-600"
                  : s.score >= 70
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {s.score}%
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceCard;
