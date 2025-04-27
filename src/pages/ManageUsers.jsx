import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ role: "", batch: "", search: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/all-users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users.");
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm(`Delete ${email}?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-user/${email}`);
      toast.success("User deleted.");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((u) => {
    return (
      u.email.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.role ? u.role === filter.role : true) &&
      (filter.batch ? u.batch === filter.batch : true)
    );
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#f9fafb] to-[#edf1f5]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">👥 Manage Users</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by email/name"
            className="px-4 py-2 border rounded-md w-60"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <select
            className="px-4 py-2 border rounded-md"
            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          >
            <option value="">Filter by Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Batch"
            className="px-4 py-2 border rounded-md w-40"
            onChange={(e) => setFilter({ ...filter, batch: e.target.value })}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white/60 backdrop-blur rounded-xl shadow-lg border border-gray-200">
          <table className="w-full text-left min-w-[600px]">
            <thead className="text-sm bg-white border-b">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-t hover:bg-white/80 transition">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">{user.batch || "-"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="text-red-600 hover:text-red-800 transition text-sm flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredUsers.length && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found with current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;