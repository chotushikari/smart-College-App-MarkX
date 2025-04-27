// import React from "react";
// import DashboardLayout from "../layout/DashboardLayout";
// import { FaChartPie, FaCalendarCheck, FaLightbulb } from "react-icons/fa";
// import { motion } from "framer-motion";

// const StudentDashboard = () => {
//   const email = localStorage.getItem("email");
//   const role = localStorage.getItem("role");

//   return (
//     <DashboardLayout role={role} email={email}>
//       <motion.div
//         initial={{ x: -20, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="grid grid-cols-1 md:grid-cols-3 gap-6"
//       >
//         <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow border border-white/20">
//           <div className="flex items-center justify-between">
//             <FaChartPie className="text-3xl text-indigo-500" />
//             <span className="text-2xl font-bold">92%</span>
//           </div>
//           <p className="mt-2 text-sm text-gray-700">Your Attendance</p>
//         </div>

//         <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow border border-white/20">
//           <div className="flex items-center justify-between">
//             <FaCalendarCheck className="text-3xl text-green-500" />
//             <span className="text-2xl font-bold">3</span>
//           </div>
//           <p className="mt-2 text-sm text-gray-700">Upcoming Classes</p>
//         </div>

//         <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow border border-white/20">
//           <div className="flex items-center justify-between">
//             <FaLightbulb className="text-3xl text-yellow-500" />
//             <span className="text-xs font-semibold">AI Tip</span>
//           </div>
//           <p className="mt-2 text-sm text-gray-700">
//             You usually miss Tuesday classes. Try setting a reminder on Monday night 📱
//           </p>
//         </div>
//       </motion.div>
//     </DashboardLayout>
//   );
// };

// export default StudentDashboard;


// src/pages/student/StudentDashboard.jsx

import React from "react";
import WelcomeBanner from "../components/students/WelcomeBanner";
import TodaysSchedule from "../components/students/TodaySchedule";
import NotificationCard from "../components/students/NotificationCard";
import AttendanceSummaryCard from "../components/students/AttendanceSummaryCard";
import AssignmentCard from "../components/students/AssignmentCard";
import PerformanceCard from "../components/students/PerformanceCard";

const StudentDashboard = () => {
  const mockStudent = {
    name: "Piyush Takrani",
    attendance: 87,
  };

  return (
    <div className="p-6 space-y-6">
      <WelcomeBanner studentName={mockStudent.name} />

      <div className="grid md:grid-cols-2 gap-6">
        <AttendanceSummaryCard attendance={mockStudent.attendance} />
        <NotificationCard />
      </div>

      <TodaysSchedule />

      <div className="grid md:grid-cols-2 gap-6">
        <AssignmentCard />
        <PerformanceCard />
      </div>
    </div>
  );
};

export default StudentDashboard;
