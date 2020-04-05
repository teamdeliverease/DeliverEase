const functions = require('firebase-functions');
const expressServer = require('./expressServer');
const firebase = require('firebase-admin');

firebase.initializeApp();

exports.dbTriggers = require('./dbTriggers');
exports.app = functions.https.onRequest(expressServer);
