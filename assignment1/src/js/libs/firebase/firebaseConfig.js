// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// import * as firebase from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.STOREFRONT_FIREBASE_API_KEY,
  authDomain: process.env.STOREFRONT_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://dmit2008-ed68c-default-rtdb.firebaseio.com",
  projectId: process.env.STOREFRONT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.STOREFRONT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.STOREFRONT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.STOREFRONT_FIREBASE_APP_ID,
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
// const auth = firebase();

// export the service objects
export { db, storage };
