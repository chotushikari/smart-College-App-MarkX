// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true,
  },
  batch: { type: String }, // for students (e.g., 2023-27)
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);