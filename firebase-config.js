import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCZ9_2oUnhH_ZG-bU_Op9ffX7XtJaQPQYY",
    authDomain: "mypolicy-c57d9.firebaseapp.com",
    projectId: "mypolicy-c57d9",
    storageBucket: "mypolicy-c57d9.appspot.com",
    messagingSenderId: "20756679398",
    appId: "1:20756679398:web:30ecc4f737fc1f2ee7c927",
    measurementId: "G-CS7H5TP721"
  };

  const app = initializeApp(firebaseConfig);

  export const authentication = getAuth(app);