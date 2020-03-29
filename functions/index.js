const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const expressServer = require('./expressServer');

firebase.initializeApp();

exports.emailer = require('./emailApi');
exports.app = functions.https.onRequest(expressServer);
