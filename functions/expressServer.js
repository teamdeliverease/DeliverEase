const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const validationMiddleware = require('./validationMiddleware.js');
const schemas = require('./schemas.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;

const mapsClient = new googleMapsClient({});
const app = express();
const router = require('./router/router')(app);

app.use(cors({ origin: true })); // Automatically allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
