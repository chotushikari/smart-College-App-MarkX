const { db } = require("../firebase");
const { v4: uuidv4 } = require("uuid");

// POST /api/announcements/create
exports.createAnnouncement = async (req, res) => {
  const { title, message, forClass, forDept, fileUrl, createdBy, createdByRole } = req.body;

  try {
    const announcementId = uuidv4();
    const data = {
      announcementId,
      title,
      message,
      forClass: forClass || null,
      forDept: forDept || null,
      fileUrl: fileUrl || null,
      createdBy,
      createdByRole,
      createdAt: new Date()
    };

    await db.collection("announcements").doc(announcementId).set(data);
    res.status(201).json({ success: true, announcementId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement", details: error.message });
  }
};

// GET /api/announcements/all
exports.getAnnouncementsForUser = async (req, res) => {
  const { userRole, classId, dept } = req.query;

  try {
    const snapshot = await db.collection("announcements")
      .orderBy("createdAt", "desc").get();

    const relevant = snapshot.docs
      .map(doc => doc.data())
      .filter(ann => {
        return (
          !ann.forClass && !ann.forDept || // Global
          (ann.forClass && ann.forClass === classId) ||
          (ann.forDept && ann.forDept === dept)
        );
      });

    res.status(200).json(relevant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements", details: error.message });
  }
};

// DELETE /api/announcements/delete/:id
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("announcements").doc(id).delete();
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete announcement", details: error.message });
  }
};


// PATCH /api/announcements/pin/:id
exports.togglePinAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection("announcements").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return res.status(404).json({ error: "Announcement not found" });

    const current = doc.data();
    await docRef.update({ isPinned: !current.isPinned });

    res.status(200).json({ message: `Announcement ${!current.isPinned ? "pinned" : "unpinned"}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle pin", details: error.message });
  }
};


// PATCH /api/announcements/edit/:id
exports.editAnnouncement = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    await db.collection("announcements").doc(id).update(updatedFields);
    res.status(200).json({ message: "Announcement updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement", details: error.message });
  }
};
