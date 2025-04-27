import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="w-full h-16 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600 dark:text-white">
        Smart College Management
      </h1>
      <div className="flex items-center gap-4">
        {/* Profile Icon */}
        <Link to="/profile" className="text-2xl text-gray-700 dark:text-gray-200">
          <FaUserCircle />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
