// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiuRUf-zVEthtS-nfLdgSNqWZcP8y1pFo",
    authDomain: "coach-project-b2752.firebaseapp.com",
    projectId: "coach-project-b2752",
    storageBucket: "coach-project-b2752.firebasestorage.app",
    messagingSenderId: "1019518174830",
    appId: "1:1019518174830:web:8d3b90265f908f291e087f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);