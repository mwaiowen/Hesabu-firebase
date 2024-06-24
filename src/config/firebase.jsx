// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDRSDpr_d_pG_-jULvMcYJg8Kkq5WCR7V0",
  // authDomain: "trying-auth-6534d.firebaseapp.com",
  // projectId: "trying-auth-6534d",
  // storageBucket: "trying-auth-6534d.appspot.com",
  // messagingSenderId: "314379413667",
  // appId: "1:314379413667:web:3a760f8d78bb27bb80f716",
  // measurementId: "G-RLPDYTY5M3",

  apiKey: "AIzaSyA9UPleNjdJ95XBMRmjg8OuqC0qCNo6Lio",
  authDomain: "hesabu-5e33a.firebaseapp.com",
  projectId: "hesabu-5e33a",
  storageBucket: "hesabu-5e33a.appspot.com",
  messagingSenderId: "199765454885",
  appId: "1:199765454885:web:8428e4dd0086dfe9b6cfcc",
  measurementId: "G-8SWQS3FKVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth };
export { db };
