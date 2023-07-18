// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMvBCTbMwNGP6kl74H2-HkbxJ_oRCRaXo",
  authDomain: "data11-415a2.firebaseapp.com",
  databaseURL: "https://data11-415a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data11-415a2",
  storageBucket: "data11-415a2.appspot.com",
  messagingSenderId: "376698783946",
  appId: "1:376698783946:web:ed5546e2a9d8b72423cc33"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
