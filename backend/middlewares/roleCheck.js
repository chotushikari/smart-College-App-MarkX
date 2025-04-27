// 📁 backend/middlewares/roleCheck.js

exports.isAdminOrFaculty = (req, res, next) => {
    if (req.user?.role === "admin" || req.user?.role === "faculty") {
      return next();
    }
    return res.status(403).json({ error: "Access denied. Admin or Faculty only." });
  };
  