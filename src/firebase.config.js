// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTVLqLjfztyvW_UJCB5udOxFZyqkSYYbI",
  authDomain: "reactwebapp-b2e5d.firebaseapp.com",
  projectId: "reactwebapp-b2e5d",
  storageBucket: "reactwebapp-b2e5d.appspot.com",
  messagingSenderId: "1050077996217",
  appId: "1:1050077996217:web:ae39f676c695fb18476768",
};

// Initialize Firebase
export const provider = new GoogleAuthProvider();
export const Gitprovider = new GithubAuthProvider();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
