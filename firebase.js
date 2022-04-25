

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVFXx50rCHIiv19qVSMBYkie5JIs8lZ2Q",
  authDomain: "fir-cy-9efeb.firebaseapp.com",
  projectId: "fir-cy-9efeb",
  storageBucket: "fir-cy-9efeb.appspot.com",
  messagingSenderId: "509614607981",
  appId: "1:509614607981:web:2558e8d00a3dace1353964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firestore database lưu trữ csdl

const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth};
