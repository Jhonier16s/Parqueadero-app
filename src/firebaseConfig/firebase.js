
import { initializeApp } from "firebase/app";

import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_RK9o4Mcsd-kh9vr68Jc9-gDUv0kfFW4",
  authDomain: "parqueadero-proyecto-fd9c9.firebaseapp.com",
  projectId: "parqueadero-proyecto-fd9c9",
  storageBucket: "parqueadero-proyecto-fd9c9.appspot.com",
  messagingSenderId: "1060548505119",
  appId: "1:1060548505119:web:c8f843b184fa732745af2a"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);