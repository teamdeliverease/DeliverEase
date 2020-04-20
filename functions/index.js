const functions = require('firebase-functions');
const expressServer = require('./expressServer');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKeys.json'),
});

exports.dbTriggers = require('./dbTriggers');
exports.app = functions.https.onRequest(expressServer);
