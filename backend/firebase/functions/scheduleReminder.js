const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

exports.sendClassReminders = functions.pubsub.schedule("every 15 minutes").onRun(async () => {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const timeInMinutes = currentHour * 60 + currentMinute;

  const classSnap = await db.collection("classes").get();

  for (const classDoc of classSnap.docs) {
    const classId = classDoc.id;
    const timetableRef = db.collection("classes").doc(classId).collection("timetable").doc("weekly");
    const timetableDoc = await timetableRef.get();

    if (!timetableDoc.exists) continue;

    const todaySchedule = timetableDoc.data()[currentDay];
    if (!todaySchedule) continue;

    for (const period of todaySchedule) {
      // You can customize this to trigger 10 mins before each period
      const classTime = period.period * 60; // Assume period 1 = 9AM = 540 mins etc
      if (Math.abs(classTime - timeInMinutes) <= 10) {
        const subject = period.subject;
        const room = period.room;

        const studentsSnap = await db.collection("users")
          .where("role", "==", "student")
          .where("classId", "==", classId).get();

        const facultySnap = await db.collection("users")
          .where("uid", "==", period.teacherId).get();

        const allUsers = [...studentsSnap.docs, ...facultySnap.docs];

        const messages = allUsers.map(userDoc => {
          const fcmToken = userDoc.data().fcmToken;
          if (!fcmToken) return null;

          return {
            token: fcmToken,
            notification: {
              title: `Upcoming Class: ${subject}`,
              body: `Starts in 10 mins at ${room}. Get ready! 📚`,
            },
            data: {
              subject,
              classId,
              room,
              type: "reminder",
            },
          };
        }).filter(Boolean);

        if (messages.length) {
          await messaging.sendAll(messages);
          console.log(`📨 Sent ${messages.length} reminders for ${subject} (${classId})`);
        }
      }
    }
  }
});
