const { db, Timestamp } = require("../firebase");

exports.predictPerformance = async (req, res) => {
  const { studentId } = req.params;
  const { attendance, avgGrade } = req.body;

  if (attendance === undefined || avgGrade === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let riskLevel = "Low";
  let suggestions = ["Keep up the good work"];

  if (attendance < 66) {
    riskLevel = "High";
    suggestions = ["Attend classes regularly", "Contact your mentor", "Avoid last-minute studies"];
  } else if (attendance < 80 && avgGrade < 6.5) {
    riskLevel = "Medium";
    suggestions = ["Revise weekly", "Improve submissions", "Join a study group"];
  }

  const predictionData = {
    attendance,
    avgGrade,
    riskLevel,
    suggestions,
    timestamp: Timestamp.now(),
  };

  try {
    await db.collection("students").doc(studentId).collection("performance").doc("prediction").set(predictionData);
    res.status(200).json({ success: true, prediction: predictionData });
  } catch (err) {
    res.status(500).json({ error: "Failed to predict performance", details: err.message });
  }
};

exports.getPerformance = async (req, res) => {
  const { studentId } = req.params;

  try {
    const doc = await db.collection("students").doc(studentId).collection("performance").doc("prediction").get();

    if (!doc.exists) {
      return res.status(404).json({ error: "No prediction data found" });
    }

    res.status(200).json(doc.data());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch performance data", details: err.message });
  }
};
