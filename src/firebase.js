import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi4zmyC93q2RJvxTsRBqUe9nh3XPlTo5w",
  authDomain: "mystore-a7c59.firebaseapp.com",
  projectId: "mystore-a7c59",
  storageBucket: "mystore-a7c59.firebasestorage.app",
  messagingSenderId: "738469009409",
  appId: "1:738469009409:web:91ef27b304ae9a8ad8c800",
  measurementId: "G-MNZ8MG4M9W"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);