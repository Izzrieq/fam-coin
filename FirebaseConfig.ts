import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUNQ-E4JOpuvsMhaIaVlcnqhnwCxiSd14",
  authDomain: "famcoin-697ba.firebaseapp.com",
  projectId: "famcoin-697ba",
  storageBucket: "famcoin-697ba.firebasestorage.app",
  messagingSenderId: "640411226225",
  appId: "1:640411226225:web:9060de06b226af05480bd0",
  measurementId: "G-R5ZQHN4Z7T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//const analytics = getAnalytics(app);