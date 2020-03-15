import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyAk1xZwWvS9eTDJfaqrjp40uNg7ScL1FGM",
  authDomain: "web-project-softdev-dacde.firebaseapp.com",
  databaseURL: "https://web-project-softdev-dacde.firebaseio.com",
  projectId: "web-project-softdev-dacde",
  storageBucket: "web-project-softdev-dacde.appspot.com",
  messagingSenderId: "318588599821",
  appId: "1:318588599821:web:de6c113fa8432c0c845f44"
};
firebase.initializeApp(config);

//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 