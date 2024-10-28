// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5_l5Q_Fe0T0RYtSnVi06gyZSUSQ4DIrU",
  authDomain: "finanzas-personales-77289.firebaseapp.com",
  projectId: "finanzas-personales-77289",
  storageBucket: "finanzas-personales-77289.appspot.com",
  messagingSenderId: "177228144686",
  appId: "1:177228144686:web:eef705a47c49eed4aaffbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app);

