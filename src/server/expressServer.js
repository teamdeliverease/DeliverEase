const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const GoogleMapsClient = require('@googlemaps/google-maps-services-js').Client;
const bodyParser = require('body-parser');
const cors = require('cors');
const validationMiddleware = require('./validationMiddleware.js');
const schemas = require('./schemas.js');
const constants = require('./constants');

const mapsClient = new GoogleMapsClient({});
const app = express();

app.use(cors({ origin: true })); // Automatically allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));

function geocode(address) {
  return mapsClient.geocode({
    params: {
      address,
      key: functions.config().apikeys.maps,
    },
  });
}

function addToFirebase(ref, data) {
  try {
    data.timestamp = firebase.database.ServerValue.TIMESTAMP;
    firebase
      .database()
      .ref(ref)
      .push(data, (err) => {
        if (err) {
          throw new Error('error writing to database');
        }
      });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

async function prepareAndAddToFirebase(ref, data, prepare) {
  try {
    const result = await geocode(data.address);
    const { results, status } = result.data;
    if (status === 'OK') {
      prepare(results[0], data);
      addToFirebase(ref, data);
    } else {
      const mapsError = new Error(`Geocode was not successful for the following reason: ${status}`);
      console.error(mapsError);
      addToFirebase(ref, data);
    }
  } catch (err) {
    throw new Error(constants.GENERIC_ERROR_MESSAGE);
  }
}

async function submitFormPostRequest(ref, req, res, prepare) {
  const data = req.body;
  try {
    await prepareAndAddToFirebase(ref, data, prepare);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

function addLocationPayload(geocodeResult, data) {
  const { location } = geocodeResult.geometry;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
}

function addFulfillmentStatusPayload(data) {
  data.fulfillment_status = constants.FULFILLMENT_STATUS.NEW;
  data.fulfillment_status_timestamp = firebase.database.ServerValue.TIMESTAMP;
}

function addNamePayload(data) {
  const fullName = `${data.firstName} ${data.lastName}`;
  return Object.assign(data, { name: fullName });
}

// Express Routes
app.post(
  '/expressApi/requesters',
  validationMiddleware(schemas.requester, 'body'),
  async (req, res) => {
    submitFormPostRequest('requesters', req, res, (geocodeResult, data) => {
      addLocationPayload(geocodeResult, data);
      addFulfillmentStatusPayload(data);
      addNamePayload(data);
    });
  },
);

app.post(
  '/expressApi/volunteers',
  validationMiddleware(schemas.volunteer, 'body'),
  async (req, res) => {
    submitFormPostRequest('volunteers', req, res, (geocodeResult, data) => {
      addLocationPayload(geocodeResult, data);
      addNamePayload(data);
    });
  },
);

module.exports = app;
