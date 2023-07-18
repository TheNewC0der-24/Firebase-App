import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAyyin3ZyFGKmEreoYVGcg4V_3-3QApsJQ",
    authDomain: "fir-tutorial-9e2a7.firebaseapp.com",
    projectId: "fir-tutorial-9e2a7",
    storageBucket: "fir-tutorial-9e2a7.appspot.com",
    messagingSenderId: "917553891320",
    appId: "1:917553891320:web:22ee9d1f933a61bb80b80d",
    measurementId: "G-DHZQBJFLML"
};

export const app = initializeApp(firebaseConfig);