import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
 apiKey: "AIzaSyBAUrS7KgsVJ9lF208SlY66D32LdrA9wS8",
  authDomain: "job-searcher-66949.firebaseapp.com",
  projectId: "job-searcher-66949",
  storageBucket: "job-searcher-66949.firebasestorage.app",
  messagingSenderId: "272647211757",
  appId: "1:272647211757:web:cc9651aebc58176cc5dae4",
  measurementId: "G-E88BYVKMGL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
