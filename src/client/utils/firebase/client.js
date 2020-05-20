import firebase from 'firebase/app';
// client
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database';

// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
  firebase.analytics();
}

export default firebase;
