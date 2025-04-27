// // routes/admin.js
// const multer = require("multer");
// const csv = require("csvtojson");
// const upload = multer({ dest: "uploads/" });

// router.post("/upload-users", upload.single("file"), async (req, res) => {
//   const file = req.file.path;
//   const users = await csv().fromFile(file);

//   const insertData = users.map(u => ({
//     email: u.email,
//     role: u.role,
//     name: u.name,
//     batch: u.batch || null,
//   }));

//   await User.insertMany(insertData);
//   res.status(200).json({ success: true });
// });

const express = require("express");
const multer = require("multer");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

const upload = multer({ dest: "uploads/" });

// Upload users via CSV
router.post("/upload-users", upload.single("file"), adminController.uploadUsers);

// Add user manually
router.post("/manual-add", adminController.manualAddUser);

// Get all users
router.get("/all-users", adminController.getAllUsers);

// Delete user by email
router.delete("/delete-user/:email", adminController.deleteUser);

// Post Announcement
router.post("/post-announcement", adminController.postAnnouncement);

// Get Announcements
router.get("/announcements", adminController.getAnnouncements);

module.exports = router;

