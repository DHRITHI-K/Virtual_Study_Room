// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzp8BlxA-lR8XmRd8UwA5rG7X5ZbMlmPU",
  authDomain: "virtual-study-room-712f5.firebaseapp.com",
  projectId: "virtual-study-room-712f5",
  storageBucket: "virtual-study-room-712f5.firebasestorage.app",
  messagingSenderId: "589771964792",
  appId: "1:589771964792:web:3f512f5f3d70195dbac88d",
  measurementId: "G-C5DMQYCJ43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);