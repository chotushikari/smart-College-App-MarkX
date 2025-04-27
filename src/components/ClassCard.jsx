// // // components/ClassDetails.jsx

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // const ClassDetails = ({ classData, onClose, refresh }) => {
// //   const [activeTab, setActiveTab] = useState("students");
// //   const [search, setSearch] = useState("");
// //   const [showUserList, setShowUserList] = useState(false);
// //   const [userList, setUserList] = useState([]);

// //   const members =
// //     activeTab === "students" ? classData.studentIds : classData.facultyIds;

// //   const fetchUsersByRole = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/api/users?role=${activeTab}`
// //       );
// //       setUserList(res.data.users || []);
// //     } catch {
// //       toast.error("Failed to fetch users");
// //     }
// //   };

// //   const handleAdd = async (uid) => {
// //     const payload =
// //       activeTab === "students" ? { studentIds: [uid] } : { facultyIds: [uid] };
// //     try {
// //       await axios.post(
// //         `http://localhost:5000/api/classes/${classData.id}/add-members`,
// //         payload
// //       );
// //       toast.success(`${activeTab} added`);
// //       refresh();
// //       setShowUserList(false);
// //     } catch {
// //       toast.error("Failed to add");
// //     }
// //   };

// //   const handleRemove = async (uid) => {
// //     const payload =
// //       activeTab === "students" ? { studentIds: [uid] } : { facultyIds: [uid] };
// //     try {
// //       await axios.post(
// //         `http://localhost:5000/api/classes/${classData.id}/remove-members`,
// //         payload
// //       );
// //       toast.success(`${activeTab} removed`);
// //       refresh();
// //     } catch {
// //       toast.error("Failed to remove");
// //     }
// //   };

// //   useEffect(() => {
// //     if (showUserList) fetchUsersByRole();
// //   }, [showUserList, activeTab]);

// //   return (
// //     <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
// //       <div className="bg-white p-6 rounded-xl w-[720px] max-h-[90vh] overflow-y-auto relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-xl text-gray-700"
// //         >
// //           ✕
// //         </button>

// //         <h2 className="text-2xl font-bold">{classData.name}</h2>
// //         <p className="text-sm text-gray-600 mb-4">
// //           ID: {classData.id} •{" "}
// //           {new Date(classData.createdAt.seconds * 1000).toLocaleString()}
// //         </p>

// //         {/* Tabs */}
// //         <div className="flex gap-3 mb-4">
// //           {["students", "faculty"].map((tab) => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               className={`px-4 py-2 rounded-md ${
// //                 activeTab === tab
// //                   ? "bg-blue-600 text-white"
// //                   : "bg-gray-200 text-gray-700"
// //               }`}
// //             >
// //               {tab === "students" ? "🧑‍🎓 Students" : "👨‍🏫 Faculty"}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Search + Add */}
// //         <div className="flex justify-between items-center mb-2">
// //           <input
// //             type="text"
// //             placeholder={`Search ${activeTab}...`}
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="input-style w-72"
// //           />
// //           <button
// //             onClick={() => setShowUserList(true)}
// //             className="btn-green text-sm"
// //           >
// //             ➕ Add {activeTab}
// //           </button>
// //         </div>

// //         {/* Member list */}
// //         <ul className="space-y-2 mb-2">
// //           {members
// //             .filter((id) => id.toLowerCase().includes(search.toLowerCase()))
// //             .map((id, i) => (
// //               <li
// //                 key={i}
// //                 className="bg-white/80 p-2 rounded-md flex justify-between shadow-sm"
// //               >
// //                 <span>{id}</span>
// //                 <button
// //                   className="text-red-600 hover:underline"
// //                   onClick={() => handleRemove(id)}
// //                 >
// //                   ❌ Remove
// //                 </button>
// //               </li>
// //             ))}
// //         </ul>

// //         {/* User list modal */}
// //         {showUserList && (
// //           <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
// //             <div className="bg-white p-6 rounded-xl w-[600px] max-h-[70vh] overflow-y-auto relative">
// //               <button
// //                 className="absolute top-4 right-4 text-xl"
// //                 onClick={() => setShowUserList(false)}
// //               >
// //                 ✕
// //               </button>
// //               <h2 className="text-xl font-semibold mb-4">Add {activeTab}</h2>
// //               <ul className="space-y-2">
// //                 {userList.map((user) => (
// //                   <li
// //                     key={user.uid}
// //                     className="bg-gray-100 p-2 rounded-md flex justify-between"
// //                   >
// //                     <span>{user.name} ({user.uid})</span>
// //                     <button
// //                       className="btn-blue text-sm"
// //                       onClick={() => handleAdd(user.uid)}
// //                     >
// //                       Add
// //                     </button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClassDetails;


// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ClassDetails = ({ selectedClass, onClose, fetchClasses }) => {
//   const [facultyInput, setFacultyInput] = useState("");
//   const [studentInput, setStudentInput] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);

//   const handleUpdate = async (type, action) => {
//     setActionLoading(true);
//     const endpoint = `http://localhost:5000/api/classes/${selectedClass.id}/${action}-members`;
//     const payload =
//       type === "faculty"
//         ? { facultyIds: [facultyInput] }
//         : { studentIds: [studentInput] };

//     try {
//       await axios.post(endpoint, payload);
//       toast.success(`${type} ${action === "add" ? "added" : "removed"} successfully`);
//       fetchClasses();
//     } catch {
//       toast.error(`Failed to ${action} ${type}`);
//     } finally {
//       setActionLoading(false);
//       type === "faculty" ? setFacultyInput("") : setStudentInput("");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
//       <div className="bg-white/70 border border-white/30 shadow-xl backdrop-blur-md p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
//         >
//           ✕
//         </button>
//         <h2 className="text-xl font-bold mb-3 text-gray-800">{selectedClass.name} Details</h2>
//         <p className="mb-2"><strong>Code:</strong> {selectedClass.code}</p>

//         <p className="mt-4 font-semibold text-gray-700">Faculty IDs:</p>
//         <ul className="list-disc ml-6 text-sm text-gray-700">
//           {(selectedClass.facultyIds || []).map((id, i) => <li key={i}>{id}</li>)}
//           {!selectedClass.facultyIds?.length && <li>None</li>}
//         </ul>

//         <p className="mt-4 font-semibold text-gray-700">Student IDs:</p>
//         <ul className="list-disc ml-6 text-sm text-gray-700">
//           {(selectedClass.studentIds || []).map((id, i) => <li key={i}>{id}</li>)}
//           {!selectedClass.studentIds?.length && <li>None</li>}
//         </ul>

//         <p className="text-sm text-gray-500 mt-3">
//           Created: {new Date(selectedClass.createdAt?.seconds * 1000).toLocaleString()}
//         </p>

//         {/* Member Management */}
//         <div className="mt-6 space-y-4">
//           <div>
//             <p className="font-medium mb-1">Manage Faculty:</p>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Faculty UID"
//                 value={facultyInput}
//                 onChange={(e) => setFacultyInput(e.target.value)}
//                 className="input-style"
//               />
//               <button onClick={() => handleUpdate("faculty", "add")} disabled={!facultyInput || actionLoading} className="btn-green">Add</button>
//               <button onClick={() => handleUpdate("faculty", "remove")} disabled={!facultyInput || actionLoading} className="btn-red">Remove</button>
//             </div>
//           </div>

//           <div>
//             <p className="font-medium mb-1">Manage Student:</p>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Student UID"
//                 value={studentInput}
//                 onChange={(e) => setStudentInput(e.target.value)}
//                 className="input-style"
//               />
//               <button onClick={() => handleUpdate("student", "add")} disabled={!studentInput || actionLoading} className="btn-green">Add</button>
//               <button onClick={() => handleUpdate("student", "remove")} disabled={!studentInput || actionLoading} className="btn-red">Remove</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassDetails;

// src/components/ClassCard.jsx
import React from "react";

const ClassCard = ({ cls, onEdit, onDelete, onAssign }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-1">{cls.name}</h2>
      <p className="text-gray-600">Code: {cls.code}</p>
      <p className="text-sm text-gray-400 mt-1">
        🧑‍🏫 {cls.facultyIds?.length || 0} Faculty | 👨‍🎓 {cls.studentIds?.length || 0} Students
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onAssign}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          👥 Assign
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
