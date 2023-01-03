import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyWFv4fbHiRAdZ_5oeUaIXplIvTBdohy4",
  authDomain: "energy-coach-f5270.firebaseapp.com",
  databaseURL: "https://energy-coach-f5270-default-rtdb.firebaseio.com",
  projectId: "energy-coach-f5270",
  storageBucket: "energy-coach-f5270.appspot.com",
  messagingSenderId: "629843836728",
  appId: "1:629843836728:web:5a6aface5a5b0748318bcd",
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, { experimentalForceLongPolling: true });
const fsdb = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);

export { auth, fsdb, rtdb };
