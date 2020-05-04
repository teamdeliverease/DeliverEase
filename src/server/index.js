const functions = require('firebase-functions');
const next = require('next');
const express = require('./expressServer');
const dbTriggers = require('./dbTriggers');

// admin.initializeApp();

const isDev = process.env.NODE_ENV !== 'production';
const app = next({
  dev: isDev,
  // the absolute directory from the package.json file that initialises this module
  // i.e.: the absolute path from the root of the Cloud Function
  conf: { distDir: 'dist/client' },
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((req, res) => {
  console.log(`File: ${req.originalUrl}`); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});

exports.nextjs = { server };
exports.expressServer = functions.https.onRequest(express);
exports.dbTriggers = dbTriggers;
