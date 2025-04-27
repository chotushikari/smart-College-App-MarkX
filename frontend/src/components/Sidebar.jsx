import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const Sidebar = ({ links = [], role }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-6 fixed">
      <div className="text-xl font-bold mb-6">
        {role.toUpperCase()} PANEL
      </div>
      <nav className="flex flex-col gap-4">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-gray-700 hover:text-blue-600 font-medium ${
              location.pathname === link.path ? "text-blue-600" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-700"
        >
          <FiLogOut /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
