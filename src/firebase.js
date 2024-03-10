import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCWzsU9Rtk6DI6kCNUxOx9FlWmrgagQRHs",
  authDomain: "tutorial-firebase-29548.firebaseapp.com",
  projectId: "tutorial-firebase-29548",
  storageBucket: "tutorial-firebase-29548.appspot.com",
  messagingSenderId: "820899192400",
  appId: "1:820899192400:web:156186f36a247738973b55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
