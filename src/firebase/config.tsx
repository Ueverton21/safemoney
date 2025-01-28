import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtkxJCbAuR6TExCRzaxTp5ys8RrRcCR04",
  authDomain: "safemoney-5445f.firebaseapp.com",
  projectId: "safemoney-5445f",
  storageBucket: "safemoney-5445f.firebasestorage.app",
  messagingSenderId: "235732401227",
  appId: "1:235732401227:web:0ab2a80d0be28472d0e1ce",
  measurementId: "G-ZC4R8QFDCW",
};

export const firebaseApp = initializeApp(firebaseConfig);

initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
