// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./FirebaseConfig";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth & Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Firestore DB (✅ Only one export for db!)
export const db = getFirestore(app);
