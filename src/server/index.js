import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';
import dbTriggers from './dbTriggers';

const firebaseConfig = {
  apiKey: 'AIzaSyDM_Ff9o42PqQJFbiuvUloq7wqR0gluyAk',
  authDomain: 'deliverease-staging.firebaseapp.com',
  databaseURL: 'https://deliverease-staging.firebaseio.com',
  projectId: 'deliverease-staging',
  storageBucket: 'deliverease-staging.appspot.com',
  messagingSenderId: '866347766098',
  appId: '1:866347766098:web:4c926a8f7b64f8ee20ea8b',
  measurementId: 'G-52KTW5D130',
};

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // i.e.: the absolute path from the root of the Cloud Function
  conf: { distDir: 'dist/client' },
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((req, res) => {
  console.log(`File: ${req.originalUrl}`); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});

const nextjs = { server };

export { nextjs, dbTriggers };
