import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnjo7pER6enPwVT-uL_Mlojfaw4ex_iqk",
  authDomain: "duanmd05mimi.firebaseapp.com",
  databaseURL: "https://duanmd05mimi-default-rtdb.firebaseio.com",
  projectId: "duanmd05mimi",
  storageBucket: "duanmd05mimi.appspot.com",
  messagingSenderId: "363882356722",
  appId: "1:363882356722:web:2f0e8a333bcc79da91956b",
  measurementId: "G-4RQ3Z44P72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
