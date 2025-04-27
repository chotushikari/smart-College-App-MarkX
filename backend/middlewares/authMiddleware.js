const { admin } = require("../firebase");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Role-based access control
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admins only" });
  next();
};

const isFaculty = (req, res, next) => {
  if (req.user?.role !== "faculty") return res.status(403).json({ error: "Faculty only" });
  next();
};

const isStudent = (req, res, next) => {
  if (req.user?.role !== "student") return res.status(403).json({ error: "Students only" });
  next();
};

module.exports = { verifyToken, isAdmin, isFaculty, isStudent };

