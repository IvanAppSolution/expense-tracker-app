// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constant from 'expo-constants';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constant.expoConfig?.extra?.APIKEY,
  authDomain: Constant.expoConfig?.extra?.AUTHDOMAIN,
  projectId: Constant.expoConfig?.extra?.PROJECTID,
  storageBucket: Constant.expoConfig?.extra?.STORAGEBUCKET,
  messagingSenderId: Constant.expoConfig?.extra?.MESSAGINGSENDERID,
  appId: Constant.expoConfig?.extra?.APPID
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
