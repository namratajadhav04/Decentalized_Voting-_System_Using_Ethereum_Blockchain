// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGldFJuFsiPH9S95DH6U8gfHroJhZbsb0",
  authDomain: "blockchain-b1a27.firebaseapp.com",
  projectId: "blockchain-b1a27",
  storageBucket: "blockchain-b1a27.appspot.com",
  messagingSenderId: "89260029592",
  appId: "1:89260029592:web:ff52bc5d16013ba28f82ed",
  measurementId: "G-D5F2GZF1ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase authentication instance
export const auth = getAuth(app);