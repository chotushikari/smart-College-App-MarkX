import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AssignmentControlCard = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "DBMS Lab 2",
      dueDate: "2025-04-25",
      submissions: 42,
      total: 50,
      link: "https://drive.google.com/some-assignment-link"
    },
    {
      id: 2,
      title: "OS Assignment",
      dueDate: "2025-04-27",
      submissions: 28,
      total: 50,
      link: ""
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        📂 Assignment Control
        <FaCloudUploadAlt className="text-indigo-500 text-xl" />
      </h2>

      {assignments.map((assignment) => (
        <motion.div
          key={assignment.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="border p-4 rounded-lg bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-semibold text-gray-700">{assignment.title}</h3>
              <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
              {assignment.link && (
                <a
                  href={assignment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 text-sm underline mt-1 inline-block"
                >
                  View Assignment
                </a>
              )}
            </div>
            <div className="text-sm text-gray-600">
              📥 {assignment.submissions} / {assignment.total} submitted
            </div>
          </div>
        </motion.div>
      ))}

      <button
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition"
        onClick={() => alert("Redirect to assignment upload page")}
      >
        ➕ Upload New Assignment
      </button>
    </div>
  );
};

export default AssignmentControlCard;
