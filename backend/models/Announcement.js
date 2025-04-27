const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: { type: String, default: "Admin" },
    target: { type: String, enum: ["all", "student", "faculty"], default: "all" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
