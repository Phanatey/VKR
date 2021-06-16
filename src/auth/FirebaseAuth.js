import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {config} from '../config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}
// firebase utils
const db = firebase.firestore()
const auth = firebase.auth();
const currentUser = auth.currentUser

export {
    db,
    auth,
    currentUser,
};