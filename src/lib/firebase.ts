
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD1Gnp3qgmq8KoccvXl9IIUeWBtQexke_8",
  authDomain: "energram-175e0.firebaseapp.com",
  projectId: "energram-175e0",
  storageBucket: "energram-175e0.firebasestorage.app",
  messagingSenderId: "960293759288",
  appId: "1:960293759288:web:a08a50764349d7bb8c79cd"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
