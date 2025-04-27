const admin = require('firebase-admin');

exports.sendFCMNotification = async (fcmToken, title, message) => {
  const payload = {
    notification: {
      title: title,
      body: message,
    },
    token: fcmToken,
  };

  try {
    await admin.messaging().send(payload);
    console.log(`Notification sent to ${fcmToken}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
