const functions = require('firebase-functions');
const admin = require('firebase-admin');
const next = require('next');
const expressServer = require('./expressServer');

admin.initializeApp();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log(`File: ${req.originalUrl}`); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});

exports.dbTriggers = require('./dbTriggers');

exports.app = functions.https.onRequest(expressServer);
