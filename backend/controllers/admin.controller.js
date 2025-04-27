const User = require("../models/user");
const Announcement = require("../models/announcement");
const uploadCSVUsers = require("../utils/csvUploader");
const sendPushNotification = require("../utils/sendPushNotification"); // For FCM

// Upload via CSV
exports.uploadUsers = async (req, res) => {
  try {
    const result = await uploadCSVUsers(req.file.path);
    res.status(200).json({ message: "Upload successful", ...result });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// Manual Add
exports.manualAddUser = async (req, res) => {
  try {
    const { name, email, role, batch } = req.body;

    if (!name || !email || !role)
      return res.status(400).json({ error: "Missing required fields" });

    if (!email.endsWith(".du.ac.in"))
      return res.status(400).json({ error: "Only .du.ac.in emails allowed" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ error: "User already exists" });

    const newUser = new User({ name, email, role, batch: batch || null });
    await newUser.save();

    res.status(200).json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const deleted = await User.findOneAndDelete({ email });
    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted", user: deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Post Announcement
exports.postAnnouncement = async (req, res) => {
  try {
    const { title, body, author, target } = req.body; // target = 'all' | 'student' | 'faculty'

    if (!title || !body)
      return res.status(400).json({ error: "Title and body required" });

    const announcement = new Announcement({ title, body, author, target });
    await announcement.save();

    // Optionally: Send push notification
    await sendPushNotification({
      title,
      body,
      target,
    });

    res.status(201).json({ message: "Announcement posted", announcement });
  } catch (err) {
    res.status(500).json({ error: "Failed to post announcement" });
  }
};

// Get All Announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch announcements" });
  }
};
