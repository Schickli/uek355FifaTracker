// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPE1E_i11az5qJYAco48bya28Ugtcq88c",
  authDomain: "fifatrackermobiledb.firebaseapp.com",
  projectId: "fifatrackermobiledb",
  storageBucket: "fifatrackermobiledb.appspot.com",
  messagingSenderId: "851482275592",
  appId: "1:851482275592:web:f180304fd8b3558d0146bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;