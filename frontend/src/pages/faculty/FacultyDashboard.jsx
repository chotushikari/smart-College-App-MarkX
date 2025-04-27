// import React from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import { FaBookOpen, FaClipboardList } from "react-icons/fa";
// import { motion } from "framer-motion";

// const FacultyDashboard = () => {
//   const email = localStorage.getItem("email");
//   const role = localStorage.getItem("role");

//   return (
//     <DashboardLayout role={role} email={email}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/20">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FaBookOpen /> Upcoming Classes
//           </h3>
//           <ul className="mt-4 text-gray-700">
//             <li>📅 Tue - 9:00AM - Data Structures</li>
//             <li>📅 Wed - 1:00PM - OS Lab</li>
//             <li>📅 Thu - 11:00AM - DBMS</li>
//           </ul>
//         </div>

//         <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/20">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FaClipboardList /> Attendance to Review
//           </h3>
//           <ul className="mt-4 text-gray-700">
//             <li>🔴 EE-201 - 5 Absentees</li>
//             <li>🟡 CS-101 - 2 Pending Edits</li>
//             <li>🟢 MA-301 - All Marked</li>
//           </ul>
//         </div>
//       </motion.div>
//     </DashboardLayout>
//   );
// };

// export default FacultyDashboard;

// src/pages/faculty/FacultyDashboard.jsx

// import React from 'react'
// import { motion } from 'framer-motion'
// import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";
// import { Separator } from "C:\smart-college-app\smart-college-app\frontend\src\components\ui\separator.jsx


// const FacultyDashboard = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 space-y-6"
//     >
//       {/* 👋 Welcome Section */}
//       <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Welcome back, Professor!</CardTitle>
//         </CardHeader>
//         <CardContent className="text-sm">Here’s a quick overview of your day 📚</CardContent>
//       </Card>

//       <Separator />

//       {/* 🔄 Today’s Schedule + Quick Attendance */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* 🗓️ Today’s Schedule */}
//         <Card>
//           <CardHeader>
//             <CardTitle>🗓️ Today's Classes</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {/* Placeholder content */}
//             <ul className="space-y-2 text-sm">
//               <li>09:00 AM - BTech CSE - Data Structures</li>
//               <li>11:00 AM - BSc IT - DBMS</li>
//               <li>02:00 PM - BCA - OS Lab</li>
//             </ul>
//           </CardContent>
//         </Card>

//         {/* ✅ Quick Attendance */}
//         <Card>
//           <CardHeader>
//             <CardTitle>✅ Mark Attendance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
//               Start Swipe Mode
//             </button>
//             <p className="text-xs text-muted-foreground mt-2">or tap to manually mark attendance</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* 📊 Attendance Insights */}
//       <Card>
//         <CardHeader>
//           <CardTitle>📊 Attendance Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-32 flex items-center justify-center text-muted-foreground">
//             [Graph Coming Soon...]
//           </div>
//         </CardContent>
//       </Card>

//       {/* 📢 Announcements + 📂 Assignments */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* 📢 Announcements */}
//         <Card>
//           <CardHeader>
//             <CardTitle>📢 Announcements</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="text-sm space-y-1">
//               <li>📌 DBMS assignment due Friday</li>
//               <li>📌 Class moved to Room 201 tomorrow</li>
//             </ul>
//           </CardContent>
//         </Card>

//         {/* 📂 Assignments */}
//         <Card>
//           <CardHeader>
//             <CardTitle>📚 Assignments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="text-sm space-y-1">
//               <li>💾 Upload DSA Assignment</li>
//               <li>✅ 20/30 students submitted DBMS</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>

//       {/* 🎓 Student Overview */}
//       <Card>
//         <CardHeader>
//           <CardTitle>🎓 Your Students</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground">View attendance, performance & insights →</p>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// export default FacultyDashboard


// import React from 'react'
// import { motion } from 'framer-motion'
// import { Separator } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/separator.jsx";

// // Modularized Components
// import WelcomeBanner from './components/WelcomeBanner'
// import TodayScheduleCard from './components/TodayScheduleCard'
// import QuickAttendanceCard from './components/QuickAttendanceCard'
// import AttendanceInsightCard from './components/AttendanceInsightCard'
// import AnnouncementList from './components/AnnouncementList'
// import AssignmentOverview from './components/AssignmentOverview'
// import StudentOverviewCard from './components/StudentOverviewCard'

// const FacultyDashboard = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 space-y-6"
//     >
//       <WelcomeBanner />
//       <Separator />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <TodayScheduleCard />
//         <QuickAttendanceCard />
//       </div>

//       <AttendanceInsightCard />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <AnnouncementList />
//         <AssignmentOverview />
//       </div>

//       <StudentOverviewCard />
//     </motion.div>
//   )
// }

// export default FacultyDashboard


// import React from 'react';
// import MyCoursesOverview from '../../components/faculty/MyCoursesOverview';
// import TodaysSchedule from '../../components/faculty/TodaysSchedule';
// import AttendanceChart from '../../components/faculty/AttendanceChart';
// import AnnouncementCard from '../../components/faculty/AnnouncementCard';
// import AssignmentControlCard from '../../components/faculty/AssignmentControlCard';

// import ChatCard from '../../components/faculty/ChatCard';
// import AIChatBot from '../../components/shared/AIChatBot';

// const FacultyDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#f9fafb] p-6 space-y-8">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           👩‍🏫 Faculty Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm">
//           {new Date().toLocaleDateString('en-IN', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//           })}
//         </p>
//       </div>

//       {/* My Courses Section */}
//       <MyCoursesOverview />

//       {/* Today's Schedule with Dynamic Class Actions */}
//       <TodaysSchedule />

//       {/* Attendance Analytics */}
//       <AttendanceChart />

//       {/* Announcements */}
//       <AnnouncementCard />

//       {/* Assignments */}
//       <AssignmentControlCard />


//       {/* Chat Section */}
//       <ChatCard />

//       {/* AI ChatBot Assistant */}
//       <AIChatBot />
//     </div>
//   );
// };

// export default FacultyDashboard;

import React from 'react';
import MyCoursesOverview from '../../components/faculty/MyCoursesOverview';
import TodaysSchedule from '../../components/faculty/TodaysSchedule';
import AttendanceChart from '../../components/faculty/AttendanceChart';
import AssignmentControlCard from '../../components/faculty/AssignmentControlCard';
import AnnouncementCard from '../../components/faculty/AnnouncementCard';
import ChatCard from '../../components/faculty/ChatCard';
import AIChatbot from '../../components/shared/AIChatBot';
import SmartRepeatAttendance from '../../components/faculty/SmartRepeatAttendance';
import ViewStudentsCard from '../../components/faculty/ViewStudentsCard';
import WelcomeBanner from '../../components/faculty/WelcomeBanner';

const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 space-y-6 relative pb-32">
     <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          👩‍🏫 Faculty Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      <WelcomeBanner />
      {/* Section 1: Courses & Schedule */}
      <MyCoursesOverview />
      <TodaysSchedule />

      {/* Section 2: Insights & Assignments */}
      <div className="grid md:grid-cols-2 gap-6">
         <AssignmentControlCard />
          <AttendanceChart />       
      </div>

      {/* Section 3: Announcements & Chat */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnnouncementCard />
        <ChatCard />
      </div>

      {/* Section 4: View Students & Smart Attendance */}
      <div className="grid md:grid-cols-2 gap-6">
        <ViewStudentsCard />
        <SmartRepeatAttendance />
      </div>

      {/* Floating AI Bot */}
      <AIChatbot />
    </div>
  );
};

export default FacultyDashboard;
