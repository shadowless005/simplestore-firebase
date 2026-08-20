import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXwkQMY9wMypuqhj7sKu8qtMBB2bFWP0M",
  authDomain: "simplestore-4d60b.firebaseapp.com",
  projectId: "simplestore-4d60b",
  storageBucket: "simplestore-4d60b.firebasestorage.app",
  messagingSenderId: "268084973739",
  appId: "1:268084973739:web:36d30fc433f68d05eca7ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
