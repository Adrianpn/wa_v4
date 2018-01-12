import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAnT7yXPdO4uKcxm_-PjEpU-u6tTwClSaY",
  authDomain: "worship-angel.firebaseapp.com",
  databaseURL: "https://worship-angel.firebaseio.com",
  projectId: "worship-angel",
  storageBucket: "worship-angel.appspot.com",
  messagingSenderId: "791484677017"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };