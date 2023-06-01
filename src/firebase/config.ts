import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_API_KEY
const appId = import.meta.env.VITE_APP_ID

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "peep-the-card-game.firebaseapp.com",
    projectId: "peep-the-card-game",
    storageBucket: "peep-the-card-game.appspot.com",
    messagingSenderId: "601489383214",
    appId: appId,
    measurementId: "G-Q3MRHZKT9E"
};

// Init firebase
const app = initializeApp(firebaseConfig);

// Init Services
const db = getFirestore(app);

export { db };