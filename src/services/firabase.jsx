// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEY0bzdvL99n5g_mlxX2NPYqgf2ftlREM",
  authDomain: "project-e-commerce-84911.firebaseapp.com",
  projectId: "project-e-commerce-84911",
  storageBucket: "project-e-commerce-84911.firebasestorage.app",
  messagingSenderId: "896224665491",
  appId: "1:896224665491:web:b51b2129820d4835309266",
  measurementId: "G-XRJ0VBKSKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
