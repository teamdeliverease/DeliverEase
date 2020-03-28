const functions = require('firebase-functions');
const form = require('./formApi');

exports.emailer = require('./emailApi');
exports.app = functions.https.onRequest(form);
