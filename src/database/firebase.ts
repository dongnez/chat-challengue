// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa5SmjjOfSgfRfUjnySYPjuV8HkmOMYwY",
  authDomain: "chat-challengue-database.firebaseapp.com",
  databaseURL: "https://chat-challengue-database-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-challengue-database",
  storageBucket: "chat-challengue-database.appspot.com",
  messagingSenderId: "413669466212",
  appId: "1:413669466212:web:ebcf89cd233bd18dfcff71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app,'https://chat-challengue-database-default-rtdb.europe-west1.firebasedatabase.app');
export const auth = getAuth(app);