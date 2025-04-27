// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ManageClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({ name: "", code: "" });
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [selectedClass, setSelectedClass] = useState(null); // 👈 for modal

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/classes/all");
//       setClasses(res.data.classes || []);
//     } catch (err) {
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.code) return toast.warning("Fill all fields");

//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/api/classes/create", form);
//       toast.success("Class created successfully");
//       setForm({ name: "", code: "" });
//       fetchClasses();
//     } catch (err) {
//       const msg = err.response?.data?.error || "Error creating class";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;
  
//     try {
//       await axios.delete(`http://localhost:5000/api/classes/${id}`);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch (err) {
//       toast.error("Failed to delete class");
//     }
//   };
  

//   const filteredClasses = classes.filter(
//     (cls) =>
//       cls.name.toLowerCase().includes(filter.toLowerCase()) ||
//       cls.code.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">🏫 Manage Classes</h2>

//         {/* Create Class Form */}
//         <form onSubmit={handleCreate} className="bg-white rounded-lg shadow p-6 mb-8">
//           <h3 className="text-lg font-semibold mb-4">➕ Create a New Class</h3>
//           <div className="flex flex-wrap gap-4 items-center">
//             <input
//               type="text"
//               placeholder="Class Name (e.g., CSE 3A)"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="border rounded-md px-4 py-2 w-60"
//             />
//             <input
//               type="text"
//               placeholder="Unique Code (e.g., CSE3A2025)"
//               value={form.code}
//               onChange={(e) => setForm({ ...form, code: e.target.value })}
//               className="border rounded-md px-4 py-2 w-60"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </form>

//         {/* Search Filter */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by name or code..."
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="px-4 py-2 border rounded-md w-72"
//           />
//         </div>

//         {/* List of Classes */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">📋 All Classes</h3>
//           <table className="w-full table-auto text-left">
//             <thead className="border-b">
//               <tr className="text-sm text-gray-600">
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Code</th>
//                 <th className="py-2 px-4">Faculty</th>
//                 <th className="py-2 px-4">Students</th>
//                 <th className="py-2 px-4">Created</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClasses.map((cls) => (
//                 <tr key={cls.id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4">{cls.name}</td>
//                   <td className="py-2 px-4">{cls.code}</td>
//                   <td className="py-2 px-4">{cls.facultyIds?.length || 0}</td>
//                   <td className="py-2 px-4">{cls.studentIds?.length || 0}</td>
//                   <td className="py-2 px-4 text-sm text-gray-500">
//                     {new Date(cls.createdAt?.seconds * 1000).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 flex gap-2">

//                     <button
//                       onClick={() => handleDelete(cls.id)}
//                       className="text-red-600 hover:underline text-sm"
//                     >             
//                       Delete
//                     </button>

//                     <button
//                       onClick={() => setSelectedClass(cls)}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {!filteredClasses.length && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-500">
//                     No classes found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Details Modal */}
//         {selectedClass && (
//   <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto shadow-xl relative">
//       <button
//         onClick={() => setSelectedClass(null)}
//         className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
//       >
//         ✕
//       </button>
//       <h2 className="text-xl font-semibold mb-4">{selectedClass.name} Details</h2>
//       <p><strong>Code:</strong> {selectedClass.code}</p>

//       {/* Faculty List */}
//       <p className="mt-4 font-medium">Faculty IDs:</p>
//       <ul className="mb-2 list-disc ml-6 text-sm text-gray-700">
//         {(selectedClass.facultyIds || []).map((id, i) => <li key={i}>{id}</li>)}
//         {(!selectedClass.facultyIds || !selectedClass.facultyIds.length) && <li>None</li>}
//       </ul>

//       {/* Student List */}
//       <p className="mt-2 font-medium">Student IDs:</p>
//       <ul className="mb-2 list-disc ml-6 text-sm text-gray-700">
//         {(selectedClass.studentIds || []).map((id, i) => <li key={i}>{id}</li>)}
//         {(!selectedClass.studentIds || !selectedClass.studentIds.length) && <li>None</li>}
//       </ul>

//       <p className="text-sm text-gray-500 mb-4">
//         Created: {new Date(selectedClass.createdAt?.seconds * 1000).toLocaleString()}
//       </p>

//       {/* Add/Remove Members */}
//       <MemberManager selectedClass={selectedClass} fetchClasses={fetchClasses} />
//     </div>
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// const MemberManager = ({ selectedClass, fetchClasses }) => {
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
//       fetchClasses(); // update UI
//     } catch (err) {
//       toast.error(`Failed to ${action} ${type}`);
//     } finally {
//       setActionLoading(false);
//       if (type === "faculty") setFacultyInput("");
//       if (type === "student") setStudentInput("");
//     }
//   };

//   return (
//     <div className="mt-6 space-y-4">
//       {/* Faculty */}
//       <div>
//         <p className="font-medium mb-1">Manage Faculty:</p>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Faculty UID"
//             value={facultyInput}
//             onChange={(e) => setFacultyInput(e.target.value)}
//             className="border px-3 py-1 rounded w-full"
//           />
//           <button
//             onClick={() => handleUpdate("faculty", "add")}
//             disabled={!facultyInput || actionLoading}
//             className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//           >
//             Add
//           </button>
//           <button
//             onClick={() => handleUpdate("faculty", "remove")}
//             disabled={!facultyInput || actionLoading}
//             className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//           >
//             Remove
//           </button>
//         </div>
//       </div>

//       {/* Student */}
//       <div>
//         <p className="font-medium mb-1">Manage Student:</p>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Student UID"
//             value={studentInput}
//             onChange={(e) => setStudentInput(e.target.value)}
//             className="border px-3 py-1 rounded w-full"
//           />
//           <button
//             onClick={() => handleUpdate("student", "add")}
//             disabled={!studentInput || actionLoading}
//             className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//           >
//             Add
//           </button>
//           <button
//             onClick={() => handleUpdate("student", "remove")}
//             disabled={!studentInput || actionLoading}
//             className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ManageClasses;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ManageClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({ name: "", code: "" });
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [selectedClass, setSelectedClass] = useState(null);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/classes/all");
//       setClasses(res.data.classes || []);
//     } catch (err) {
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.code) return toast.warning("Fill all fields");
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/api/classes/create", form);
//       toast.success("Class created successfully");
//       setForm({ name: "", code: "" });
//       fetchClasses();
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Error creating class");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/classes/${id}`);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch {
//       toast.error("Failed to delete class");
//     }
//   };

//   const filteredClasses = classes.filter(
//     (cls) =>
//       cls.name.toLowerCase().includes(filter.toLowerCase()) ||
//       cls.code.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center drop-shadow">
//           🎓 Manage Classes
//         </h2>

//         {/* Create Class Form */}
//         <form
//           onSubmit={handleCreate}
//           className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8 border border-white/30"
//         >
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">
//             ➕ Create a New Class
//           </h3>
//           <div className="flex flex-wrap gap-4 items-center">
//             <input
//               type="text"
//               placeholder="Class Name (e.g., CSE 3A)"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="input-style"
//             />
//             <input
//               type="text"
//               placeholder="Unique Code (e.g., CSE3A2025)"
//               value={form.code}
//               onChange={(e) => setForm({ ...form, code: e.target.value })}
//               className="input-style"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-blue"
//             >
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </form>

//         {/* Search Filter */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search by name or code..."
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="input-style w-80"
//           />
//         </div>

//         {/* Classes List */}
//         <div className="glass-card">
//           <h3 className="text-lg font-semibold mb-4">📋 All Classes</h3>
//           <table className="w-full table-auto text-left">
//             <thead className="border-b border-white/30 text-gray-700">
//               <tr className="text-sm">
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Code</th>
//                 <th className="py-2 px-4">Faculty</th>
//                 <th className="py-2 px-4">Students</th>
//                 <th className="py-2 px-4">Created</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClasses.map((cls) => (
//                 <tr key={cls.id} className="border-t border-white/20 hover:bg-white/20 transition">
//                   <td className="py-2 px-4">{cls.name}</td>
//                   <td className="py-2 px-4">{cls.code}</td>
//                   <td className="py-2 px-4">{cls.facultyIds?.length || 0}</td>
//                   <td className="py-2 px-4">{cls.studentIds?.length || 0}</td>
//                   <td className="py-2 px-4 text-sm text-gray-600">
//                     {new Date(cls.createdAt?.seconds * 1000).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 flex gap-2 text-sm">
//                     <button
//                       onClick={() => handleDelete(cls.id)}
//                       className="text-red-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => setSelectedClass(cls)}
//                       className="text-blue-500 hover:underline"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {!filteredClasses.length && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-600">
//                     No classes found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal */}
//         {selectedClass && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
//             <div className="bg-white/70 border border-white/30 shadow-xl backdrop-blur-md p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto relative">
//               <button
//                 onClick={() => setSelectedClass(null)}
//                 className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
//               >
//                 ✕
//               </button>
//               <h2 className="text-xl font-bold mb-3 text-gray-800">{selectedClass.name} Details</h2>
//               <p className="mb-2"><strong>Code:</strong> {selectedClass.code}</p>

//               <p className="mt-4 font-semibold text-gray-700">Faculty IDs:</p>
//               <ul className="list-disc ml-6 text-sm text-gray-700">
//                 {(selectedClass.facultyIds || []).map((id, i) => <li key={i}>{id}</li>)}
//                 {!selectedClass.facultyIds?.length && <li>None</li>}
//               </ul>

//               <p className="mt-4 font-semibold text-gray-700">Student IDs:</p>
//               <ul className="list-disc ml-6 text-sm text-gray-700">
//                 {(selectedClass.studentIds || []).map((id, i) => <li key={i}>{id}</li>)}
//                 {!selectedClass.studentIds?.length && <li>None</li>}
//               </ul>

//               <p className="text-sm text-gray-500 mt-3">
//                 Created: {new Date(selectedClass.createdAt?.seconds * 1000).toLocaleString()}
//               </p>

//               <MemberManager selectedClass={selectedClass} fetchClasses={fetchClasses} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // MemberManager Component
// const MemberManager = ({ selectedClass, fetchClasses }) => {
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
//     <div className="mt-6 space-y-4">
//       {/* Faculty Input */}
//       <div>
//         <p className="font-medium mb-1">Manage Faculty:</p>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Faculty UID"
//             value={facultyInput}
//             onChange={(e) => setFacultyInput(e.target.value)}
//             className="input-style"
//           />
//           <button onClick={() => handleUpdate("faculty", "add")} disabled={!facultyInput || actionLoading} className="btn-green">Add</button>
//           <button onClick={() => handleUpdate("faculty", "remove")} disabled={!facultyInput || actionLoading} className="btn-red">Remove</button>
//         </div>
//       </div>

//       {/* Student Input */}
//       <div>
//         <p className="font-medium mb-1">Manage Student:</p>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Student UID"
//             value={studentInput}
//             onChange={(e) => setStudentInput(e.target.value)}
//             className="input-style"
//           />
//           <button onClick={() => handleUpdate("student", "add")} disabled={!studentInput || actionLoading} className="btn-green">Add</button>
//           <button onClick={() => handleUpdate("student", "remove")} disabled={!studentInput || actionLoading} className="btn-red">Remove</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Tailwind Styles
// const style = document.createElement("style");
// style.innerHTML = `
// .input-style {
//   @apply border border-gray-300 rounded-md px-4 py-2 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 backdrop-blur;
// }
// .btn-blue {
//   @apply bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium;
// }
// .btn-green {
//   @apply bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition;
// }
// .btn-red {
//   @apply bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition;
// }
// .glass-card {
//   @apply bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/30;
// }
// `;
// document.head.appendChild(style);

// export default ManageClasses;


// // src/pages/ManageClasses.jsx

// // pages/ManageClasses.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ClassDetails from "../components/ClassDetails";

// const ManageClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({ name: "", code: "" });
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [selectedClass, setSelectedClass] = useState(null);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/classes/all");
//       setClasses(res.data.classes || []);
//     } catch (err) {
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.code) return toast.warning("Fill all fields");
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/api/classes/create", form);
//       toast.success("Class created successfully");
//       setForm({ name: "", code: "" });
//       fetchClasses();
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Error creating class");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/classes/${id}`);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch {
//       toast.error("Failed to delete class");
//     }
//   };

//   const filteredClasses = classes.filter(
//     (cls) =>
//       cls.name.toLowerCase().includes(filter.toLowerCase()) ||
//       cls.code.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center drop-shadow">
//           🎓 Manage Classes
//         </h2>

//         {/* Create Class */}
//         <form
//           onSubmit={handleCreate}
//           className="glass-card mb-8"
//         >
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">
//             ➕ Create a New Class
//           </h3>
//           <div className="flex flex-wrap gap-4 items-center">
//             <input
//               type="text"
//               placeholder="Class Name (e.g., CSE 3A)"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="input-style"
//             />
//             <input
//               type="text"
//               placeholder="Unique Code (e.g., CSE3A2025)"
//               value={form.code}
//               onChange={(e) => setForm({ ...form, code: e.target.value })}
//               className="input-style"
//             />
//             <button type="submit" disabled={loading} className="btn-blue">
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </form>

//         {/* Filter */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search by name or code..."
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="input-style w-80"
//           />
//         </div>

//         {/* Class List */}
//         <div className="glass-card">
//           <h3 className="text-lg font-semibold mb-4">📋 All Classes</h3>
//           <table className="w-full table-auto text-left">
//             <thead className="border-b border-white/30 text-gray-700">
//               <tr className="text-sm">
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Code</th>
//                 <th className="py-2 px-4">Faculty</th>
//                 <th className="py-2 px-4">Students</th>
//                 <th className="py-2 px-4">Created</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClasses.map((cls) => (
//                 <tr key={cls.id} className="border-t border-white/20 hover:bg-white/20 transition">
//                   <td className="py-2 px-4">{cls.name}</td>
//                   <td className="py-2 px-4">{cls.code}</td>
//                   <td className="py-2 px-4">{cls.facultyIds?.length || 0}</td>
//                   <td className="py-2 px-4">{cls.studentIds?.length || 0}</td>
//                   <td className="py-2 px-4 text-sm text-gray-600">
//                     {new Date(cls.createdAt?.seconds * 1000).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 flex gap-2 text-sm">
//                     <button onClick={() => handleDelete(cls.id)} className="text-red-500 hover:underline">
//                       Delete
//                     </button>
//                     <button onClick={() => setSelectedClass(cls)} className="text-blue-500 hover:underline">
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {!filteredClasses.length && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-600">
//                     No classes found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Class Modal */}
//         {selectedClass && (
//           <ClassDetails
//             selectedClass={selectedClass}
//             onClose={() => setSelectedClass(null)}
//             fetchClasses={fetchClasses}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageClasses;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { toast } from "react-toastify";

const api = "http://localhost:5000/api/classes";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    section: "A",
    facultyEmail: "",
    timings: "",
  });
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState([]);
  const [classStudents, setClassStudents] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${api}/all`);
      setClasses(res.data.classes || []);
    } catch (err) {
      toast.error("Failed to load classes");
      console.error("Error fetching classes:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      return toast.warning("Class name and code are required");
    }
    
    setLoading(true);
    try {
      await axios.post(`${api}/create`, {
        name: form.name,
        code: form.code,
        section: form.section,
        facultyEmail: form.facultyEmail,
        timings: form.timings
      });
      
      toast.success("Class created successfully!");
      setForm({
        name: "",
        code: "",
        section: "A",
        facultyEmail: "",
        timings: "",
      });
      fetchClasses();
    } catch (err) {
      console.error("Create class error:", err);
      toast.error(err.response?.data?.error || "Error creating class");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      await axios.delete(`${api}/${id}`);
      toast.success("Class deleted successfully");
      setSelectedClass(null);
      fetchClasses();
    } catch (err) {
      console.error("Delete class error:", err);
      toast.error("Failed to delete class");
    }
  };

  const handleViewClass = async (classId) => {
    try {
      const res = await axios.get(`${api}/${classId}`);
      setSelectedClass(res.data);
      fetchClassStudents(classId);
    } catch (err) {
      console.error("View class error:", err);
      toast.error("Failed to load class details");
    }
  };

  const fetchClassStudents = async (classId) => {
    try {
      const res = await axios.get(`${api}/${classId}`);
      setClassStudents(res.data.students || []);
    } catch (err) {
      console.error("Fetch students error:", err);
      setClassStudents([]);
    }
  };

  const handleSearchUser = async () => {
    if (!searchUser.trim()) return;
    
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/all-users`);
      const filteredUsers = res.data.filter(
        (user) => 
          user.role === "student" && 
          (user.name?.toLowerCase().includes(searchUser.toLowerCase()) || 
           user.email?.toLowerCase().includes(searchUser.toLowerCase()))
      );
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Search user error:", err);
      toast.error("User search failed");
    }
  };
  const handleAddStudent = async (classId, studentId) => {
    // Debugging: Log the studentId and classId
    console.log("Class ID:", classId);
    console.log("Student ID:", studentId);
  
    try {
      // Send studentId as a query parameter
      const response = await axios.post(`${api}/${classId}/add-members?studentId=${studentId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding student:", error.response?.data);
    }
  };
  
  
  
  const handleRemoveStudent = async (userId) => {
    if (!selectedClass) {
      toast.error("No class selected");
      return;
    }
    
    const classId = selectedClass._id || selectedClass.id;
    
    if (!classId) {
      toast.error("Invalid class ID");
      return;
    }
    
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }
    
    try {
      await axios.post(`${api}/${classId}/remove-members`, {
        studentIds: [userId]
      });
      toast.success("Student removed from class");
      fetchClassStudents(classId);
    } catch (err) {
      console.error("Remove student error:", err);
      toast.error(err.response?.data?.error || "Failed to remove student from class");
    }
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name?.toLowerCase().includes(filter.toLowerCase()) ||
    cls.code?.toLowerCase().includes(filter.toLowerCase()) ||
    cls.section?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">📚 Manage Classes</h1>

        {/* Create Class Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Create New Class</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Name*</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mathematics 101"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Code*</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. MATH101"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <input
                type="text"
                name="section"
                value={form.section}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. A"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Email</label>
              <input
                type="email"
                name="facultyEmail"
                value={form.facultyEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="faculty@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timings</label>
              <input
                type="text"
                name="timings"
                value={form.timings}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mon-Wed, 10AM - 12PM"
              />
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {loading ? "Creating..." : "Create Class"}
              </button>
            </div>
          </form>
        </div>

        {/* Filter Classes */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search classes by name, code or section..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Classes List */}
        <div className="bg-white/70 backdrop-blur rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <h2 className="text-xl font-medium p-4 bg-gray-50 border-b">All Classes</h2>
          {filteredClasses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Code</th>
                    <th className="text-left px-4 py-3">Section</th>
                    <th className="text-left px-4 py-3">Faculty</th>
                    <th className="text-left px-4 py-3">Timings</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map((cls) => (
                    <tr key={cls._id || cls.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{cls.name}</td>
                      <td className="px-4 py-3">{cls.code}</td>
                      <td className="px-4 py-3">{cls.section}</td>
                      <td className="px-4 py-3">{cls.facultyEmail || "-"}</td>
                      <td className="px-4 py-3">{cls.timings || "-"}</td>
                      <td className="px-4 py-3 flex space-x-2">
                        <button 
                          onClick={() => handleViewClass(cls._id || cls.id)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View Class"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleDelete(cls._id || cls.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete Class"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-8 text-gray-500">
              No classes found. Create a new class to get started.
            </div>
          )}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Class Details</h3>
              <button 
                onClick={() => {
                  setSelectedClass(null);
                  setClassStudents([]);
                  setUsers([]);
                  setSearchUser("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
              {/* Class Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedClass.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Code</p>
                  <p className="font-medium">{selectedClass.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Section</p>
                  <p className="font-medium">{selectedClass.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Faculty</p>
                  <p className="font-medium">{selectedClass.facultyEmail || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timings</p>
                  <p className="font-medium">{selectedClass.timings || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">
                    {new Date(selectedClass.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              
              {/* Students Section */}
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4">Students</h4>
                
                {/* Search and Add Students */}
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="px-3 py-2 border rounded-md flex-grow"
                  />
                  <button
                    onClick={handleSearchUser}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                </div>
                
                {/* Search Results */}
                {users.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Search Results</h5>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-xs">
                          <tr>
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Batch</th>
                            <th className="text-left p-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id || user.id} className="border-t hover:bg-gray-50">
                              <td className="p-2">{user.name}</td>
                              <td className="p-2">{user.email}</td>
                              <td className="p-2">{user.batch || "-"}</td>
                              <td className="p-2">
                                <button 
                                  onClick={() => handleAddStudent(user._id || user.id)}
                                  className="p-1 text-green-600 hover:text-green-800 flex items-center gap-1"
                                >
                                  <FaUserPlus size={12} /> Add
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Current Students */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Enrolled Students</h5>
                  {classStudents.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-xs">
                          <tr>
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Batch</th>
                            <th className="text-left p-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classStudents.map((student) => (
                            <tr key={student._id || student.id} className="border-t hover:bg-gray-50">
                              <td className="p-2">{student.name}</td>
                              <td className="p-2">{student.email}</td>
                              <td className="p-2">{student.batch || "-"}</td>
                              <td className="p-2">
                                <button 
                                  onClick={() => handleRemoveStudent(student._id || student.id)}
                                  className="p-1 text-red-600 hover:text-red-800 flex items-center gap-1"
                                >
                                  <FaUserMinus size={12} /> Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 p-2">No students enrolled in this class.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setClassStudents([]);
                  setUsers([]);
                  setSearchUser("");
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaTrash, FaUserPlus, FaUserMinus } from "react-icons/fa";
// import { toast } from "react-toastify";

// const api = "http://localhost:5000/api/classes";

// const ManageClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",  // Changed from courseName to name
//     code: "",  // Added code field instead of batch
//     section: "A",
//     facultyEmail: "",
//     timings: "",
//   });
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [searchUser, setSearchUser] = useState("");
//   const [users, setUsers] = useState([]);
//   const [classStudents, setClassStudents] = useState([]);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get(`${api}/all`);
//       setClasses(res.data.classes || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//       console.error("Error fetching classes:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.code) {
//       return toast.warning("Class name and code are required");
//     }
    
//     setLoading(true);
//     try {
//       // Send the data in the format expected by your backend controller
//       await axios.post(`${api}/create`, {
//         name: form.name,
//         code: form.code,
//         section: form.section,
//         facultyEmail: form.facultyEmail,
//         timings: form.timings
//       });
      
//       toast.success("Class created successfully!");
//       setForm({
//         name: "",
//         code: "",
//         section: "A",
//         facultyEmail: "",
//         timings: "",
//       });
//       fetchClasses();
//     } catch (err) {
//       console.error("Create class error:", err);
//       toast.error(err.response?.data?.error || "Error creating class");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;
//     try {
//       await axios.delete(`${api}/${id}`);
//       toast.success("Class deleted successfully");
//       setSelectedClass(null);
//       fetchClasses();
//     } catch (err) {
//       console.error("Delete class error:", err);
//       toast.error("Failed to delete class");
//     }
//   };

//   const handleViewClass = async (classId) => {
//     try {
//       const res = await axios.get(`${api}/${classId}`);
//       setSelectedClass(res.data);
//       fetchClassStudents(classId);
//     } catch (err) {
//       console.error("View class error:", err);
//       toast.error("Failed to load class details");
//     }
//   };

//   const fetchClassStudents = async (classId) => {
//     try {
//       // Note: You might need to adjust this endpoint based on your API
//       // This assumes there's an endpoint to get students in a class
//       const res = await axios.get(`${api}/${classId}`);
//       // Extract students based on your API response structure
//       setClassStudents(res.data.students || []);
//     } catch (err) {
//       console.error("Fetch students error:", err);
//       setClassStudents([]);
//     }
//   };

//   const handleSearchUser = async () => {
//     if (!searchUser.trim()) return;
    
//     try {
//       // Using your existing API for user search
//       const res = await axios.get(`http://localhost:5000/api/admin/all-users`);
//       const filteredUsers = res.data.filter(
//         (user) => 
//           user.role === "student" && 
//           (user.name?.toLowerCase().includes(searchUser.toLowerCase()) || 
//            user.email?.toLowerCase().includes(searchUser.toLowerCase()))
//       );
//       setUsers(filteredUsers);
//     } catch (err) {
//       console.error("Search user error:", err);
//       toast.error("User search failed");
//     }
//   };

//   const handleAddStudent = async (userId) => {
//     if (!selectedClass || !userId) return;
    
//     try {
//       await axios.post(`${api}/${selectedClass._id}/add-members`, {
//         studentIds: [userId]
//       });
//       toast.success("Student added to class");
//       fetchClassStudents(selectedClass._id);
//       setUsers([]); // Clear search results
//       setSearchUser("");
//     } catch (err) {
//       console.error("Add student error:", err);
//       toast.error("Failed to add student to class");
//     }
//   };

//   const handleRemoveStudent = async (userId) => {
//     if (!selectedClass || !userId) return;
    
//     try {
//       await axios.post(`${api}/${selectedClass._id}/remove-members`, {
//         studentIds: [userId]
//       });
//       toast.success("Student removed from class");
//       fetchClassStudents(selectedClass._id);
//     } catch (err) {
//       console.error("Remove student error:", err);
//       toast.error("Failed to remove student from class");
//     }
//   };

//   const filteredClasses = classes.filter((cls) =>
//     cls.name?.toLowerCase().includes(filter.toLowerCase()) ||
//     cls.code?.toLowerCase().includes(filter.toLowerCase()) ||
//     cls.section?.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-semibold mb-6 text-gray-800">📚 Manage Classes</h1>

//         {/* Create Class Form */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
//           <h2 className="text-xl font-medium mb-4 text-gray-700">Create New Class</h2>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Class Name*</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. Mathematics 101"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Class Code*</label>
//               <input
//                 type="text"
//                 name="code"
//                 value={form.code}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. MATH101"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
//               <input
//                 type="text"
//                 name="section"
//                 value={form.section}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. A"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Email</label>
//               <input
//                 type="email"
//                 name="facultyEmail"
//                 value={form.facultyEmail}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="faculty@example.com"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Timings</label>
//               <input
//                 type="text"
//                 name="timings"
//                 value={form.timings}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. Mon-Wed, 10AM - 12PM"
//               />
//             </div>
            
//             <div className="flex items-end">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               >
//                 {loading ? "Creating..." : "Create Class"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Filter Classes */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search classes by name, code or section..."
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="w-full md:w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Classes List */}
//         <div className="bg-white/70 backdrop-blur rounded-xl shadow-md border border-gray-200 overflow-hidden">
//           <h2 className="text-xl font-medium p-4 bg-gray-50 border-b">All Classes</h2>
//           {filteredClasses.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 text-sm">
//                   <tr>
//                     <th className="text-left px-4 py-3">Name</th>
//                     <th className="text-left px-4 py-3">Code</th>
//                     <th className="text-left px-4 py-3">Section</th>
//                     <th className="text-left px-4 py-3">Faculty</th>
//                     <th className="text-left px-4 py-3">Timings</th>
//                     <th className="text-left px-4 py-3">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredClasses.map((cls) => (
//                     <tr key={cls._id || cls.id} className="border-t hover:bg-gray-50 transition">
//                       <td className="px-4 py-3">{cls.name}</td>
//                       <td className="px-4 py-3">{cls.code}</td>
//                       <td className="px-4 py-3">{cls.section}</td>
//                       <td className="px-4 py-3">{cls.facultyEmail || "-"}</td>
//                       <td className="px-4 py-3">{cls.timings || "-"}</td>
//                       <td className="px-4 py-3 flex space-x-2">
//                         <button 
//                           onClick={() => handleViewClass(cls._id || cls.id)}
//                           className="p-1 text-blue-600 hover:text-blue-800"
//                           title="View Class"
//                         >
//                           <FaEye />
//                         </button>
//                         <button 
//                           onClick={() => handleDelete(cls._id || cls.id)}
//                           className="p-1 text-red-600 hover:text-red-800"
//                           title="Delete Class"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center p-8 text-gray-500">
//               No classes found. Create a new class to get started.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Class Details Modal */}
//       {selectedClass && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="text-xl font-semibold">Class Details</h3>
//               <button 
//                 onClick={() => {
//                   setSelectedClass(null);
//                   setClassStudents([]);
//                   setUsers([]);
//                   setSearchUser("");
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>
            
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
//               {/* Class Info */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <p className="text-sm text-gray-500">Name</p>
//                   <p className="font-medium">{selectedClass.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Code</p>
//                   <p className="font-medium">{selectedClass.code}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Section</p>
//                   <p className="font-medium">{selectedClass.section}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Faculty</p>
//                   <p className="font-medium">{selectedClass.facultyEmail || "-"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Timings</p>
//                   <p className="font-medium">{selectedClass.timings || "-"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Created</p>
//                   <p className="font-medium">
//                     {new Date(selectedClass.createdAt).toLocaleDateString("en-US", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric"
//                     })}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Students Section */}
//               <div className="mt-6">
//                 <h4 className="text-lg font-medium mb-4">Students</h4>
                
//                 {/* Search and Add Students */}
//                 <div className="mb-4 flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="Search students by name or email..."
//                     value={searchUser}
//                     onChange={(e) => setSearchUser(e.target.value)}
//                     className="px-3 py-2 border rounded-md flex-grow"
//                   />
//                   <button
//                     onClick={handleSearchUser}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     Search
//                   </button>
//                 </div>
                
//                 {/* Search Results */}
//                 {users.length > 0 && (
//                   <div className="mb-6">
//                     <h5 className="text-sm font-medium text-gray-700 mb-2">Search Results</h5>
//                     <div className="border rounded-md overflow-hidden">
//                       <table className="w-full">
//                         <thead className="bg-gray-50 text-xs">
//                           <tr>
//                             <th className="text-left p-2">Name</th>
//                             <th className="text-left p-2">Email</th>
//                             <th className="text-left p-2">Batch</th>
//                             <th className="text-left p-2">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {users.map((user) => (
//                             <tr key={user._id || user.id} className="border-t hover:bg-gray-50">
//                               <td className="p-2">{user.name}</td>
//                               <td className="p-2">{user.email}</td>
//                               <td className="p-2">{user.batch || "-"}</td>
//                               <td className="p-2">
//                                 <button 
//                                   onClick={() => handleAddStudent(user._id || user.id)}
//                                   className="p-1 text-green-600 hover:text-green-800 flex items-center gap-1"
//                                 >
//                                   <FaUserPlus size={12} /> Add
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Current Students */}
//                 <div>
//                   <h5 className="text-sm font-medium text-gray-700 mb-2">Enrolled Students</h5>
//                   {classStudents.length > 0 ? (
//                     <div className="border rounded-md overflow-hidden">
//                       <table className="w-full">
//                         <thead className="bg-gray-50 text-xs">
//                           <tr>
//                             <th className="text-left p-2">Name</th>
//                             <th className="text-left p-2">Email</th>
//                             <th className="text-left p-2">Batch</th>
//                             <th className="text-left p-2">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {classStudents.map((student) => (
//                             <tr key={student._id || student.id} className="border-t hover:bg-gray-50">
//                               <td className="p-2">{student.name}</td>
//                               <td className="p-2">{student.email}</td>
//                               <td className="p-2">{student.batch || "-"}</td>
//                               <td className="p-2">
//                                 <button 
//                                   onClick={() => handleRemoveStudent(student._id || student.id)}
//                                   className="p-1 text-red-600 hover:text-red-800 flex items-center gap-1"
//                                 >
//                                   <FaUserMinus size={12} /> Remove
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 p-2">No students enrolled in this class.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={() => {
//                   setSelectedClass(null);
//                   setClassStudents([]);
//                   setUsers([]);
//                   setSearchUser("");
//                 }}
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageClasses;