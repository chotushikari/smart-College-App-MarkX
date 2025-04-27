// // frontend/src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import FacultyDashboard from "./pages/FacultyDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import AdminUpload from "./pages/AdminUpload";
// import ProtectedRoute from "./utils/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import StudentAttendance from "./pages/StudentAttendance";
// import FacultyAttendance from "./pages/FacultyAttendance";





// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default login route */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />

//         {/* Admin Dashboard */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Upload Users Page */}
//         <Route
//           path="/admin/upload"
//           element={
//             <ProtectedRoute>
//               <AdminUpload />
//             </ProtectedRoute>
//           }
//         />

//         {/* Faculty Dashboard */}
//         <Route
//           path="/faculty/dashboard"
//           element={
//             <ProtectedRoute>
//               <FacultyDashboard />
//             </ProtectedRoute>
//           }
//         />
//         {/* Faculty Attendance Page */}
//         <Route
//           path="/faculty/attendance"
//           element={
//             <ProtectedRoute>
//               <FacultyAttendance />
//             </ProtectedRoute>
//           }
//         />
//         {/* Student Dashboard */}
//         <Route
//           path="/student/dashboard"
//           element={
//             <ProtectedRoute>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />
        
//         {/* Student Attendance Page */}
//         <Route
//           path="/student/attendance"
//           element={
//             <ProtectedRoute>
//               <StudentAttendance />
//             </ProtectedRoute>
//           }
//         />
//         {/* Fallback route */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminUpload from "./pages/AdminUpload";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageUsers from "./pages/ManageUsers";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import ManageClasses from "./pages/ManageClasses";

// Attendance Pages
import StudentAttendance from "./pages/StudentAttendance";
import FacultyAttendance from "./pages/FacultyAttendance";

// // Other Pages (implemented)
// import NotFound from "./pages/NotFound"; // 404 page

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 🛠 Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute>
              <AdminUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/announcements" element={<ManageAnnouncements />} />
        <Route path="/admin/classes" element={<ManageClasses />} />


        {/* 👩‍🏫 Faculty Routes */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/faculty/attendance/:classId" element={<FacultyAttendance />} />

        {/* <Route
          path="/faculty/attendance"
          element={
            <ProtectedRoute>
              <FacultyAttendance />
            </ProtectedRoute>
          }
        /> */}

        {/* 🧑‍🎓 Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        
      </Routes>

      {/* 🍞 Global Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
