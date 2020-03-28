const functions = require('firebase-functions');
const expressServer = require('./expressServer');
const firebase = require('firebase-admin');

firebase.initializeApp();

exports.emailer = require('./emailApi');
exports.app = functions.https.onRequest(expressServer);
