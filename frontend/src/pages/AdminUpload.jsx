// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminUpload = () => {
//   const [file, setFile] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     batch: ""
//   });

//   const handleCSVUpload = async () => {
//     if (!file) return toast.error("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/upload-users", formData);
//       toast.success("CSV uploaded successfully");
//     } catch (err) {
//       toast.error("Upload failed: " + err.response?.data?.error || "Unknown error");
//     }
//   };

//   const handleManualAdd = async () => {
//     const { email, name, role } = form;
//     if (!email.endsWith(".du.ac.in")) return toast.error("Only .du.ac.in emails allowed");
//     if (!email || !name || !role) return toast.error("All fields except batch are required");

//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/manual-add", form);
//       toast.success("User added successfully");
//     } catch (err) {
//       toast.error("Error: " + err.response?.data?.error || "Unknown");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel - Add Users</h2>

//       <div className="mb-6">
//         <label className="block font-semibold mb-2">Upload CSV</label>
//         <input type="file" onChange={e => setFile(e.target.files[0])} />
//         <button
//           onClick={handleCSVUpload}
//           className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Upload CSV
//         </button>
//       </div>

//       <hr className="my-6" />

//       <div className="space-y-4">
//         <h3 className="font-semibold text-lg">Add User Manually</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           className="border px-4 py-2 w-full rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           className="border px-4 py-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Role (admin/student/faculty)"
//           value={form.role}
//           onChange={e => setForm({ ...form, role: e.target.value })}
//           className="border px-4 py-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Batch (optional)"
//           value={form.batch}
//           onChange={e => setForm({ ...form, batch: e.target.value })}
//           className="border px-4 py-2 w-full rounded"
//         />

//         <button
//           onClick={handleManualAdd}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Add User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminUpload;

// 📍 pages/AdminUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    batch: ""
  });

  const handleCSVUpload = async () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/admin/upload-users", formData);
      toast.success("📂 CSV uploaded successfully");
    } catch (err) {
      toast.error("Upload failed: " + err.response?.data?.error || "Unknown error");
    }
  };

  const handleManualAdd = async () => {
    const { email, name, role } = form;
    if (!email.endsWith(".du.ac.in")) return toast.error("Only .du.ac.in emails allowed");
    if (!email || !name || !role) return toast.error("All fields except batch are required");

    try {
      await axios.post("http://localhost:5000/api/admin/manual-add", form);
      toast.success("✅ User added successfully");
    } catch (err) {
      toast.error("Error: " + err.response?.data?.error || "Unknown");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f8fa] to-[#e4e9f0] p-6">
      <div className="w-full max-w-3xl rounded-3xl shadow-2xl backdrop-blur-md bg-white/50 border border-gray-200 p-8 space-y-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">👨‍💼 Admin Panel — Add Users</h2>
          <p className="text-sm text-gray-500 mt-1">Effortlessly upload CSVs or manually onboard users</p>
        </div>

        {/* Upload CSV */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">Upload CSV</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-xl shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleCSVUpload}
            className="w-full py-3 px-6 bg-[#1a1a1a] text-white rounded-xl font-semibold hover:bg-black transition-all"
          >
            Upload CSV
          </button>
        </div>

        <hr className="border-gray-300" />

        {/* Manual Form */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">Add Manually</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="👤 Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="📧 Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="🛠 Role (admin/student/faculty)"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="📅 Batch (optional)"
              value={form.batch}
              onChange={e => setForm({ ...form, batch: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            onClick={handleManualAdd}
            className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:from-black hover:to-black transition-all"
          >
            ➕ Add User
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400 pt-4">
          🔒 Data secured by SCMS • Only authorized Admins can access this panel
        </p>
      </div>
    </div>
  );
};

export default AdminUpload;
