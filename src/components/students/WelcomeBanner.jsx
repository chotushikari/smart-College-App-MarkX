import React from "react";
import { motion } from "framer-motion";
import { FaSmile } from "react-icons/fa";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  else if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const WelcomeBanner = ({ studentName = "Student" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {getGreeting()}, {studentName} 👋
          </h1>
          <p className="text-sm text-blue-100">
            Hope you’re ready for a productive day! 💪
          </p>
        </div>
        <FaSmile className="text-4xl opacity-80" />
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
