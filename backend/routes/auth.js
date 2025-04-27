// // routes/auth.js
// router.post("/verify-email", async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
  
//     if (!user) return res.status(401).json({ success: false });
  
//     const token = jwt.sign(
//       { userId: user._id, role: user.role, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
  
//     res.status(200).json({ success: true, token, role: user.role });
//   });
// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// Use the controller function here:
router.post("/verify-email", authController.verifyEmail);

module.exports = router;
