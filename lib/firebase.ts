// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-3fi7HMpz2rp9GbIcRLzrP8FzVyYHapc",
  authDomain: "assignment4-4b951.firebaseapp.com",
  projectId: "assignment4-4b951",
  storageBucket: "assignment4-4b951.firebasestorage.app",
  messagingSenderId: "287394544811",
  appId: "1:287394544811:web:ec4cae98262562bd82cbee"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
