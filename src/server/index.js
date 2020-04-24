import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';
import expressServer from './expressServer';
import dbTriggers from './dbTriggers';

admin.initializeApp();

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

const express = functions.https.onRequest(expressServer);

const nextjs = { server };

export { nextjs, express, dbTriggers };
