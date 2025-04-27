// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const attendanceRoutes = require("./routes/attendance");
// const chatRoutes = require("./routes/chat");
// const aiRoutes = require("./routes/ai");


// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/attendance", attendanceRoutes);
// // Default Route
// app.get("/", (req, res) => {
//   res.send("SCMS Backend Running ✅");
// });

// // Server Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Route Imports
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const attendanceRoutes = require("./routes/attendance");
const chatRoutes = require("./routes/chat");
const aiRoutes = require("./routes/ai");
const analyticsRoutes = require("./routes/analytics");
const announcementRoutes = require("./routes/announcement");
const assignmentRoutes = require("./routes/assignment");
const classRoutes = require("./routes/class");
const facultyRoutes = require("./routes/faculty");
const insightsRoutes = require("./routes/insights");
const notificationRoutes = require("./routes/notification");
const performanceRoutes = require("./routes/performance");
const studentRoutes = require("./routes/student");
const timetableRoutes = require("./routes/timetable.route");
const userRoutes = require("./routes/user"); // Import user routes

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));


// Firebase Init
require("./firebase"); // make sure firebase.js sets up admin.firestore()

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static for uploads (if needed)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/users", userRoutes); // Mount user routes here
// Default Route
app.get("/", (req, res) => {
  res.send("✅ Smart College Management System (SCMS) Backend is Live!");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SCMS Backend running on http://localhost:${PORT}`);
});
