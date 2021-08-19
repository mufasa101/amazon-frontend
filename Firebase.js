// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBFSRmIJ82nOtKDcxU1T8d4fWgUs2LXlLo",
    authDomain: "fir-6e756.firebaseapp.com",
    projectId: "fir-6e756",
    storageBucket: "fir-6e756.appspot.com",
    messagingSenderId: "79898782365",
    appId: "1:79898782365:web:d7f73ae6f60225147fc274",
    measurementId: "G-6B3E5HPDW8"
  };



  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();