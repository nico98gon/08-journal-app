// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
//     apiKey: "AIzaSyDBiQLqNEnb2RJiuK0FtD-mY3XUdHxzUEU",
//     authDomain: "journal-app-3c3d9.firebaseapp.com",
//     projectId: "journal-app-3c3d9",
//     storageBucket: "journal-app-3c3d9.appspot.com",
//     messagingSenderId: "277855651860",
//     appId: "1:277855651860:web:1d07a9c28a3160d1817f01"
// };

// Testing
const firebaseConfig = {
    apiKey: "AIzaSyAe0Lt5IIbcFqejHR4R-iuDA2SfgzzAPWU",
    authDomain: "journal-app-testing-7e1e4.firebaseapp.com",
    projectId: "journal-app-testing-7e1e4",
    storageBucket: "journal-app-testing-7e1e4.appspot.com",
    messagingSenderId: "532594777337",
    appId: "1:532594777337:web:145d40d587a1277b149628",
    measurementId: "G-P78BY8N5SG"
    };

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
