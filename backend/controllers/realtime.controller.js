// backend/controllers/realtime.controller.js
exports.listenToAttendanceChanges = (req, res) => {
    const { classId } = req.params;
  
    try {
      const attendanceRef = db.collection("classes").doc(classId).collection("students");
  
      attendanceRef.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            console.log("Attendance Updated: ", change.doc.data());
            // optional: emit via socket or store elsewhere
          }
        });
      });
  
      res.status(200).json({ message: "Listening to real-time attendance changes" });
    } catch (error) {
      console.error("Error setting listener:", error);
      res.status(500).json({ message: "Listener failed" });
    }
  };

  