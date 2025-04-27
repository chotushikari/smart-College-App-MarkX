const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    batch: { type: String, required: true },
    section: { type: String, default: "A" },
    facultyEmail: { type: String }, // Optional: Faculty assigned
    timings: { type: String }, // e.g., "Mon-Fri, 10AM - 12PM"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
