// backend/firebase.js
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Check for required environment variables
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is missing.");
  process.exit(1);
}
if (!process.env.FIREBASE_DATABASE_URL) {
  console.error("FIREBASE_DATABASE_URL environment variable is missing.");
  process.exit(1);
}

// Load service account key from file
let serviceAccount;
try {
  const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service account key file not found at path: ${serviceAccountPath}`);
  }
  serviceAccount = require(serviceAccountPath);

  // Validate required fields in service account key
  const requiredFields = ["project_id", "private_key", "client_email"];
  const missingFields = requiredFields.filter(field => !serviceAccount[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields in service account key: ${missingFields.join(", ")}`);
  }
} catch (error) {
  console.error("Failed to load Firebase service account key:", error.message);
  process.exit(1);
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// Export Firestore and Auth
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
