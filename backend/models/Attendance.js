const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["present", "absent"], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // faculty or self
  mode: { type: String, enum: ["swipe", "button"], required: true }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
