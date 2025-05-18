
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

/*
Recommended Firestore Security Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /orders/{docId} {
      allow read, write: if request.auth != null;
    }

    match /waitlist/{docId} {
      allow read: if request.auth != null;
      allow write: if true;
    }

    match /contacts/{docId} {
      allow read: if request.auth != null;
      allow write: if true;
    }
    
    match /partnerships/{docId} {
      allow read: if request.auth != null;
      allow write: if true;
    }

    // Admin-only collections
    match /{collection}/{docId} {
      allow read, write: if 
        collection != "users" && 
        collection != "orders" && 
        collection != "waitlist" && 
        collection != "contacts" && 
        collection != "partnerships" && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ["admin", "super_admin"];
    }
  }
}
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
