import React from 'react';
import { FaChalkboardTeacher, FaBullhorn, FaCommentDots, FaClipboardCheck } from 'react-icons/fa';

const sampleCourses = [
  {
    id: 1,
    className: 'B.Tech CSE',
    subject: 'Data Structures',
    section: 'A',
  },
  {
    id: 2,
    className: 'B.Tech IT',
    subject: 'Operating Systems',
    section: 'B',
  },
];

const MyCoursesOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">🎓 My Courses Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sampleCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow rounded-xl p-5 border border-gray-100 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.subject}</h3>
            <p className="text-sm text-gray-500 mb-4">{course.className} - Section {course.section}</p>

            <div className="flex gap-3">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaClipboardCheck /> Attendance
              </button>
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaBullhorn /> Announce
              </button>
              <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaCommentDots /> Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesOverview;
