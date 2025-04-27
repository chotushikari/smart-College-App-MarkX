const { db } = require("../firebase");

// ✅ Get users by role

exports.getUsersByRole = async (req, res) => {
    try {
      const { role } = req.query;
  
      if (!role || (role !== "student" && role !== "faculty")) {
        return res.status(400).json({ message: "Invalid or missing role parameter" });
      }
  
      const snapshot = await db.collection("users").where("role", "==", role).get();
  
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };
  