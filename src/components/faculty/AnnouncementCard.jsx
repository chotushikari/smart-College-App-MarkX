// import React from 'react';

// const AnnouncementCard = () => {
//   const announcements = [
//     { id: 1, title: "DSA Mid-term Rescheduled", time: "2 hrs ago" },
//     { id: 2, title: "Assignment 3 Deadline Extended", time: "Yesterday" },
//   ];

//   return (
//     <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold text-gray-700">📢 Latest Announcements</h2>
//         <button className="text-sm text-blue-600 hover:underline">View All</button>
//       </div>
//       <ul className="space-y-2 text-sm text-gray-700">
//         {announcements.map(ann => (
//           <li key={ann.id} className="flex justify-between">
//             <span>{ann.title}</span>
//             <span className="text-gray-400 text-xs">{ann.time}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AnnouncementCard;

import React from 'react';
import { FaThumbtack, FaEdit, FaEye } from 'react-icons/fa';

const mockAnnouncements = [
  {
    id: 1,
    title: '📣 Exam Notice - Mid Sem',
    postedAt: 'April 18, 2025',
    pinned: true,
  },
  {
    id: 2,
    title: '📌 Assignment Submission Deadline Extended',
    postedAt: 'April 16, 2025',
    pinned: false,
  },
  {
    id: 3,
    title: '🎉 Guest Lecture Tomorrow at 10AM',
    postedAt: 'April 15, 2025',
    pinned: false,
  },
];

const AnnouncementCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">📢 Latest Announcements</h2>
        <a href="/faculty/announcements" className="text-sm text-indigo-600 hover:underline">
          View All
        </a>
      </div>

      <ul className="space-y-4">
        {mockAnnouncements.map((a) => (
          <li key={a.id} className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">{a.title}</h3>
              <p className="text-xs text-gray-500">{a.postedAt}</p>
            </div>
            <div className="flex gap-3 text-gray-500 mt-1">
              {a.pinned && <FaThumbtack title="Pinned" className="text-yellow-500" />}
              <FaEdit title="Edit" className="cursor-pointer hover:text-indigo-600" />
              <FaEye title="View Stats" className="cursor-pointer hover:text-green-600" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementCard;
