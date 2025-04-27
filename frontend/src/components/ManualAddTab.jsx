// 📍 components/ManualAddTab.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManualAddTab = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    batch: ""
  });

  const handleSubmit = async () => {
    const { name, email, role } = form;
    if (!name || !email || !role) return toast.error("Please fill all required fields");
    if (!email.endsWith(".du.ac.in")) return toast.error("Only .du.ac.in emails allowed");

    try {
      await axios.post("http://localhost:5000/api/admin/manual-add", form);
      toast.success("User added successfully 🎉");
      setForm({ name: "", email: "", role: "", batch: "" });
    } catch (err) {
      toast.error("Error: " + err.response?.data?.error || "Unknown");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border px-4 py-2 w-full rounded"
      />
      <input
        type="email"
        placeholder="Email (.du.ac.in)"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="border px-4 py-2 w-full rounded"
      />
      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
        className="border px-4 py-2 w-full rounded"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="faculty">Faculty</option>
        <option value="student">Student</option>
      </select>
      <input
        type="text"
        placeholder="Batch (Optional)"
        value={form.batch}
        onChange={e => setForm({ ...form, batch: e.target.value })}
        className="border px-4 py-2 w-full rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition"
      >
        Add User
      </button>
    </div>
  );
};

export default ManualAddTab;
