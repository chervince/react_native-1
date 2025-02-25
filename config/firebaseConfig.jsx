// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "api key",
  authDomain: "react-native-expo-1-9219b.firebaseapp.com",
  projectId: "react-native-expo-1-9219b",
  storageBucket: "react-native-expo-1-9219b.firebasestorage.app",
  messagingSenderId: "802502718626",
  appId: "1:802502718626:web:b5560e79cd6e0f3d3513fb",
  measurementId: "G-9EPV9F8QH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth (app,{
  persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app)
const analytics = getAnalytics(app);
