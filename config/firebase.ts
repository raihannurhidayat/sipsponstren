// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "next-app-44743.firebaseapp.com",
  projectId: "next-app-44743",
  storageBucket: "next-app-44743.appspot.com",
  messagingSenderId: "102680819544",
  appId: "1:102680819544:web:51f378a76a526c3c77d72d",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
