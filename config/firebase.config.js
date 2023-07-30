import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWYL7Rrghi5_ih595pfrkV1I52G7zG16s",
  authDomain: "expo-chat-app-51a89.firebaseapp.com",
  projectId: "expo-chat-app-51a89",
  storageBucket: "expo-chat-app-51a89.appspot.com",
  messagingSenderId: "70489001775",
  appId: "1:70489001775:web:44669dd663fe06bf6cdbda",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };
