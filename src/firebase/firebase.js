import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCSlZ7BvFOLOfl0igZLtN0O0WeF-NE1T7o",
  authDomain: "snowballers-198f9.firebaseapp.com",
  databaseURL: "https://snowballers-198f9.firebaseio.com",
  projectId: "snowballers-198f9",
  storageBucket: "snowballers-198f9.appspot.com",
  messagingSenderId: "777441677545",
  appId: "1:777441677545:web:14caae03b3353a8d8ca078",
  measurementId: "G-MVX97391W5"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const teamsCollection = db.collection('users')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  teamsCollection,
}