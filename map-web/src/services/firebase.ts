import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAGLC_lydN9t5Dwb5fZ14_ZE9AsjKdH3c4",
	authDomain: "long-nomad-388814.firebaseapp.com",
	projectId: "long-nomad-388814",
	storageBucket: "long-nomad-388814.appspot.com",
	messagingSenderId: "182480578227",
	appId: "1:182480578227:web:032653b091aa4e94d7b2c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
