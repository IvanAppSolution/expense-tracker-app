// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//
// @ts-nocheck
import { EXPO_FB_API_KEY, EXPO_FB_APP_ID, EXPO_FB_AUTH_DOMAIN, EXPO_FB_MESSAGING_SENDER_ID, EXPO_FB_PROJECT_ID, EXPO_FB_STORAGE_BUCKET } from "@env";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// console.log("Firebase API EXPO_FB_API_KEY:", EXPO_FB_API_KEY);
// console.log("Firebase API EXPO_FB_AUTH_DOMAIN:", EXPO_FB_AUTH_DOMAIN);
// console.log("Firebase API EXPO_FB_PROJECT_ID:", EXPO_FB_PROJECT_ID);
// console.log("Firebase API EXPO_FB_STORAGE_BUCKET:", EXPO_FB_STORAGE_BUCKET);
// console.log("Firebase API EXPO_FB_MESSAGING_SENDER_ID:", EXPO_FB_MESSAGING_SENDER_ID);
// console.log("Firebase API EXPO_FB_APP_ID:", EXPO_FB_APP_ID);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: EXPO_FB_API_KEY,
  authDomain: EXPO_FB_AUTH_DOMAIN,
  projectId: EXPO_FB_PROJECT_ID,
  storageBucket: EXPO_FB_STORAGE_BUCKET,
  messagingSenderId: EXPO_FB_MESSAGING_SENDER_ID,
  appId: EXPO_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const reactNativePersistence = getReactNativePersistence(ReactNativeAsyncStorage);
// auth
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence
});



// db
export const firestore = getFirestore(app);
