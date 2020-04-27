import firebase from 'firebase/app';
import 'firebase/auth';

const localConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

export default () => {
  const dev = process.env.NODE_ENV !== 'production';
  if (!firebase.apps.length) {
    if (dev) {
      firebase.initializeApp(localConfig);
    } else {
      firebase.initializeApp();
    }
  }
};
