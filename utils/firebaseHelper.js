
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const getFirebaseApp = () => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdgnOiN07OP0XTY-lSmynqgbzu3ccLFEk",
  authDomain: "whatsapp-2ac47.firebaseapp.com",
  projectId: "whatsapp-2ac47",
  storageBucket: "whatsapp-2ac47.appspot.com",
  messagingSenderId: "747308266398",
  appId: "1:747308266398:web:70b7c40c98ba9ae245dc8f",
  measurementId: "G-DKHCMQGZ3J"
};

// Initialize Firebase
	return initializeApp(firebaseConfig);	 
}
