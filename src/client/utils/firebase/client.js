import firebase from 'firebase/app';
// client
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database';

// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined' && !firebase.apps.length) {
  // THESE ARE THE PRODUCTION CONFIGS, DON'T USE THESE LOCALLY
  firebase.initializeApp({
    projectId: 'deliverease-f9eec',
    appId: '1:436542528471:web:90e09ee2379187a34c4992',
    databaseURL: 'https://deliverease-f9eec.firebaseio.com',
    storageBucket: 'deliverease-f9eec.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c',
    authDomain: 'deliverease-f9eec.firebaseapp.com',
    messagingSenderId: '436542528471',
    measurementId: 'G-KVEMXD2KHE',
  });
  firebase.analytics();
}

export default firebase;
