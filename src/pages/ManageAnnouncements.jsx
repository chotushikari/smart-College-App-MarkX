// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaThumbtack, FaEdit } from "react-icons/fa";
// import { toast } from "react-toastify";
// import moment from "moment";

// const ManageAnnouncements = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [editData, setEditData] = useState({ title: "", message: "" });

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/announcements/all");
//       const sorted = res.data.sort((a, b) => {
//         // First sort by pinned, then by date
//         if (a.isPinned === b.isPinned) {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         }
//         return b.isPinned - a.isPinned;
//       });
//       setAnnouncements(sorted);
//     } catch (err) {
//       toast.error("Failed to load announcements.");
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this announcement?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/announcements/delete/${id}`);
//       toast.success("Deleted successfully.");
//       fetchAnnouncements();
//     } catch {
//       toast.error("Failed to delete.");
//     }
//   };

//   const handlePinToggle = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/announcements/pin/${id}`);
//       toast.success("Toggled pin.");
//       fetchAnnouncements();
//     } catch {
//       toast.error("Failed to pin/unpin.");
//     }
//   };

//   const handleEdit = (ann) => {
//     setEditing(ann.announcementId);
//     setEditData({ title: ann.title, message: ann.message });
//   };

//   const submitEdit = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/announcements/edit/${editing}`, editData);
//       toast.success("Updated successfully.");
//       setEditing(null);
//       fetchAnnouncements();
//     } catch {
//       toast.error("Failed to update.");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-10 bg-gray-50">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6">📢 Manage Announcements</h2>

//         {announcements.map((ann) => (
//           <div
//             key={ann.announcementId}
//             className={`p-5 mb-4 rounded-lg border shadow-sm relative ${
//               ann.isPinned ? "bg-yellow-100 border-yellow-400" : "bg-white"
//             }`}
//           >
//             {editing === ann.announcementId ? (
//               <div>
//                 <input
//                   className="w-full mb-2 px-3 py-2 border rounded"
//                   value={editData.title}
//                   onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                 />
//                 <textarea
//                   className="w-full px-3 py-2 border rounded"
//                   rows={3}
//                   value={editData.message}
//                   onChange={(e) => setEditData({ ...editData, message: e.target.value })}
//                 />
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     className="px-4 py-1 bg-blue-600 text-white rounded"
//                     onClick={submitEdit}
//                   >
//                     Save
//                   </button>
//                   <button
//                     className="px-4 py-1 bg-gray-300 rounded"
//                     onClick={() => setEditing(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-xl font-semibold mb-1">{ann.title}</h3>
//                 <p className="mb-2 text-gray-700">{ann.message}</p>
//                 <p className="text-xs text-gray-500">
//                   Posted by: {ann.createdBy} ({ann.createdByRole}) ·{" "}
//                   {moment(ann.createdAt.toDate()).fromNow()}
//                 </p>
//               </>
//             )}

//             <div className="absolute top-3 right-3 flex gap-3 items-center">
//               <button
//                 title="Edit"
//                 onClick={() => handleEdit(ann)}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 <FaEdit />
//               </button>
//               <button
//                 title="Pin/Unpin"
//                 onClick={() => handlePinToggle(ann.announcementId)}
//                 className="text-yellow-600 hover:text-yellow-800"
//               >
//                 <FaThumbtack />
//               </button>
//               <button
//                 title="Delete"
//                 onClick={() => handleDelete(ann.announcementId)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           </div>
//         ))}

//         {!announcements.length && (
//           <p className="text-center text-gray-500 mt-10">No announcements found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageAnnouncements;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaThumbtack, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", message: "" });

  // New announcement form
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    forClass: "",
    forDept: "",
    fileUrl: "",
    createdBy: "admin@college.edu",
    createdByRole: "admin",
  });

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements/all");
      const sorted = res.data.sort((a, b) => {
        if (a.isPinned === b.isPinned) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.isPinned - a.isPinned;
      });
      setAnnouncements(sorted);
    } catch (err) {
      toast.error("Failed to load announcements.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/delete/${id}`);
      toast.success("Deleted successfully.");
      fetchAnnouncements();
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const handlePinToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/announcements/pin/${id}`);
      toast.success("Pin status updated.");
      fetchAnnouncements();
    } catch {
      toast.error("Failed to pin/unpin.");
    }
  };

  const handleEdit = (ann) => {
    setEditing(ann.announcementId);
    setEditData({ title: ann.title, message: ann.message });
  };

  const submitEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/announcements/edit/${editing}`, editData);
      toast.success("Updated successfully.");
      setEditing(null);
      fetchAnnouncements();
    } catch {
      toast.error("Failed to update.");
    }
  };

  const handleCreate = async () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast.warning("Title and message are required.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/announcements/create", newAnnouncement);
      toast.success("Announcement created.");
      setNewAnnouncement({
        title: "",
        message: "",
        forClass: "",
        forDept: "",
        fileUrl: "",
        createdBy: "admin@college.edu",
        createdByRole: "admin",
      });
      fetchAnnouncements();
    } catch (err) {
      toast.error("Failed to create announcement.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📢 Manage Announcements</h2>

        {/* Create Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h3 className="text-xl font-semibold mb-4">Create New Announcement</h3>
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          />
          <textarea
            rows={3}
            placeholder="Message"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={newAnnouncement.message}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
          />
          <div className="flex flex-wrap gap-3 mb-3">
            <input
              type="text"
              placeholder="For Class (optional)"
              className="flex-1 px-4 py-2 border rounded"
              value={newAnnouncement.forClass}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, forClass: e.target.value })}
            />
            <input
              type="text"
              placeholder="For Department (optional)"
              className="flex-1 px-4 py-2 border rounded"
              value={newAnnouncement.forDept}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, forDept: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="File URL (optional)"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={newAnnouncement.fileUrl}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, fileUrl: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleCreate}
          >
            ➕ Create Announcement
          </button>
        </div>

        {/* Announcement List */}
        {announcements.map((ann) => (
          <div
            key={ann.announcementId}
            className={`p-5 mb-4 rounded-lg border shadow-sm relative ${
              ann.isPinned ? "bg-yellow-100 border-yellow-400" : "bg-white"
            }`}
          >
            {editing === ann.announcementId ? (
              <div>
                <input
                  className="w-full mb-2 px-3 py-2 border rounded"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                  value={editData.message}
                  onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                />
                <div className="mt-3 flex gap-2">
                  <button className="px-4 py-1 bg-blue-600 text-white rounded" onClick={submitEdit}>
                    Save
                  </button>
                  <button
                    className="px-4 py-1 bg-gray-300 rounded"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-1">{ann.title}</h3>
                <p className="mb-2 text-gray-700">{ann.message}</p>
                {ann.fileUrl && (
                  <a
                    href={ann.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Attachment
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Posted by: {ann.createdBy} ({ann.createdByRole}) ·{" "}
                  {moment(ann.createdAt).fromNow()}
                </p>
              </>
            )}

            <div className="absolute top-3 right-3 flex gap-3 items-center">
              <button
                title="Edit"
                onClick={() => handleEdit(ann)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                title="Pin/Unpin"
                onClick={() => handlePinToggle(ann.announcementId)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <FaThumbtack />
              </button>
              <button
                title="Delete"
                onClick={() => handleDelete(ann.announcementId)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {!announcements.length && (
          <p className="text-center text-gray-500 mt-10">No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
