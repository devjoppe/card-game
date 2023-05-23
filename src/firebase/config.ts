import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDK2FIfESr3ahdNCGpZXQ_M3NyzCx_9vq0",
    authDomain: "peep-card-game.firebaseapp.com",
    projectId: "peep-card-game",
    storageBucket: "peep-card-game.appspot.com",
    messagingSenderId: "121746397857",
    appId: "1:121746397857:web:8e2685de4e7110c570aee0",
    measurementId: "G-9YHBQENKTJ"
}

// Init firebase
const app = initializeApp(firebaseConfig);

// Init Services
const db = getFirestore(app);

export { db };