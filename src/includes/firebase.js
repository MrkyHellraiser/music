import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0sqMhZk0wAv9P7YCnDsFqudo_EdqPDLA",
  authDomain: "music-141ca.firebaseapp.com",
  projectId: "music-141ca",
  storageBucket: "music-141ca.appspot.com",
  appId: "1:247971388150:web:6b67756b7e047ead49aad7",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");
export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
