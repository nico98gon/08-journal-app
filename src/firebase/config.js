// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBiQLqNEnb2RJiuK0FtD-mY3XUdHxzUEU",
    authDomain: "journal-app-3c3d9.firebaseapp.com",
    projectId: "journal-app-3c3d9",
    storageBucket: "journal-app-3c3d9.appspot.com",
    messagingSenderId: "277855651860",
    appId: "1:277855651860:web:1d07a9c28a3160d1817f01"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
