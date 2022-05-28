// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4QGS44rwessMDqsxMSs60fAWpPDg_vZg",
    authDomain: "engage-app-8602.firebaseapp.com",
    projectId: "engage-app-8602",
    storageBucket: "engage-app-8602.appspot.com",
    messagingSenderId: "974932460998",
    appId: "1:974932460998:web:f27e6d6e29d3ae7fe45ec7"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth()

export default app
export { auth, db }
