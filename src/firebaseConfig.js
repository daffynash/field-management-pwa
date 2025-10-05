// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvMMZRmsHLOZW8TBCVs_kfmvjVIcfOp_E",
  authDomain: "field-management-5be3b.firebaseapp.com",
  projectId: "field-management-5be3b",
  storageBucket: "field-management-5be3b.firebasestorage.app",
  messagingSenderId: "245248667587",
  appId: "1:245248667587:web:3f53208414188387c91776",
  measurementId: "G-PJYFXMGC34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export { db };