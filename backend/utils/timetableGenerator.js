const { db } = require("../firebase");

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS_PER_DAY = 6;

const generateTimetable = async (classId) => {
  // 1. Fetch subjects and teachers
  const subjectSnap = await db.collection("classes").doc(classId).collection("subjects").get();
  const subjects = subjectSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  if (!subjects.length) throw new Error("No subjects found for this class.");

  // 2. Fetch available rooms
  const roomSnap = await db.collection("rooms").get();
  const rooms = roomSnap.docs.map(doc => doc.data());

  if (!rooms.length) throw new Error("No rooms found.");

  // 3. Create a blank timetable
  const timetable = {};

  for (const day of DAYS) {
    timetable[day] = [];

    // Keep track of used subjects and room usage for this day
    const usedSubjects = new Set();
    const roomUsage = {}; // { period: roomId }

    for (let period = 1; period <= PERIODS_PER_DAY; period++) {
      // Pick a subject not used back-to-back
      const availableSubjects = subjects.filter(sub => !usedSubjects.has(sub.id));
      const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

      if (!subject) continue;

      // Pick a free room for that period
      const usedRooms = Object.values(roomUsage);
      const freeRooms = rooms.filter(room => !usedRooms.includes(room.roomId));
      const room = freeRooms[Math.floor(Math.random() * freeRooms.length)];

      if (!room) continue;

      // Assign the subject-teacher-room to the period
      timetable[day].push({
        period,
        subject: subject.subjectName,
        teacherId: subject.teacherId,
        room: room.name,
      });

      // Update state
      usedSubjects.add(subject.id);
      roomUsage[period] = room.roomId;

      // Reset subject usage after all used
      if (usedSubjects.size === subjects.length) usedSubjects.clear();
    }
  }

  // 4. Save to Firestore
  await db.collection("classes").doc(classId).collection("timetable").doc("weekly").set(timetable);
  return timetable;
};

module.exports = generateTimetable;
