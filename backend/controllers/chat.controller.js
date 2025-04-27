// const { db, Timestamp } = require("../firebase");

// exports.sendMessage = async (req, res) => {
//   const { classId } = req.params;
//   const { message, senderId, role } = req.body;

//   if (!message || !senderId || !role) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     await db.collection("classes").doc(classId)
//       .collection("chat")
//       .add({
//         message,
//         senderId,
//         role,
//         timestamp: Timestamp.now()
//       });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to send message", details: err.message });
//   }
// };

// exports.getChat = async (req, res) => {
//   const { classId } = req.params;

//   try {
//     const chatSnap = await db.collection("classes").doc(classId)
//       .collection("chat")
//       .orderBy("timestamp", "asc")
//       .get();

//     const messages = chatSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to get chat", details: err.message });
//   }
// };
const { db, Timestamp } = require("../firebase");

// Send a message to the class chat
exports.sendMessage = async (req, res) => {
  const { classId } = req.params;  // Get class ID from params
  const { message, senderId, role } = req.body;  // Get message, sender ID, and role from request body

  // Validation: Ensure all required fields are provided
  if (!message || !senderId || !role) {
    return res.status(400).json({ error: "Missing fields: message, senderId, and role are required" });
  }

  try {
    // Add the message to the Firestore class chat subcollection
    await db.collection("classes")
      .doc(classId)  // Get the class by ID
      .collection("chat")  // Add to the chat subcollection
      .add({
        message,
        senderId,
        role,
        timestamp: Timestamp.now(),  // Automatically set the timestamp when the message is sent
      });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
};

// Get all chat messages for a class
exports.getChat = async (req, res) => {
  const { classId } = req.params;  // Get class ID from params

  try {
    // Fetch the chat messages from the Firestore class chat subcollection, ordered by timestamp
    const chatSnap = await db.collection("classes")
      .doc(classId)
      .collection("chat")
      .orderBy("timestamp", "asc")  // Order messages by timestamp
      .get();

    // Map the Firestore documents to an array of message data
    const messages = chatSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Respond with the messages array
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error getting chat messages:", err);
    res.status(500).json({ error: "Failed to get chat messages", details: err.message });
  }
};
