import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
  const links = [
    
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Upload Users", path: "/admin/upload" },
        { label: "Manage Users", path: "/admin/users" },
        { label: "Manage Classes", path: "/admin/classes" },
        { label: "Announcements", path: "/admin/announcements" },
        { label: "Settings", path: "/admin/settings" },
      
      
  ];

  return (
    <div className="flex">
      <Sidebar links={links} role="Admin" />
      <div className="ml-64 w-full">
        <Topbar title="Admin Dashboard" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
