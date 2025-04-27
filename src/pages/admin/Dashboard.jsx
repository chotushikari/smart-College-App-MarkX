import AdminLayout from "../layouts/AdminLayout";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-5 flex items-center gap-4 w-full md:w-1/3">
    <div className="text-3xl text-blue-500">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">👋 Welcome, Admin!</h2>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <StatCard title="Total Students" value="480" icon="🧑‍🎓" />
          <StatCard title="Total Faculty" value="32" icon="👩‍🏫" />
          <StatCard title="Active Batches" value="6" icon="📚" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              to="/admin/upload"
              className="bg-indigo-100 hover:bg-indigo-200 transition-all rounded-md px-4 py-3 font-medium text-indigo-700"
            >
              📤 Upload Users
            </Link>
            <Link
              to="/admin/users"
              className="bg-blue-100 hover:bg-blue-200 transition-all rounded-md px-4 py-3 font-medium text-blue-700"
            >
              👥 Manage Users
            </Link>
            <Link
              to="/admin/announcements"
              className="bg-yellow-100 hover:bg-yellow-200 transition-all rounded-md px-4 py-3 font-medium text-yellow-700"
            >
              📢 Make Announcement
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
