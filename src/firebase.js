import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCnjo7pER6enPwVT-uL_Mlojfaw4ex_iqk",
  authDomain: "duanmd05mimi.firebaseapp.com",
  databaseURL: "https://duanmd05mimi-default-rtdb.firebaseio.com",
  projectId: "duanmd05mimi",
  storageBucket: "duanmd05mimi.appspot.com",
  messagingSenderId: "363882356722",
  appId: "1:363882356722:web:27be3711d36c822591956b",
  measurementId: "G-7KQJHVL9EK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
