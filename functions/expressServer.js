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

app.use(cors({ origin: true })); // Automatically allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));

const fulfillment_status = {
  NEW: 'new',
  SOURCING_VOLUNTEER: 'sourcing_volunteer',
  PENDING_FULFILLMENT: 'pending_fullfilment',
  FULFILLING: 'fulfilling',
  COMPLETE: 'complete',
};

const GENERIC_ERROR_MESSAGE =
  'Whoops! Something went wrong, sorry about that. If this problem continues, please call us at (415) 633-6261';

app.post('/requesters', validationMiddleware(schemas.requester, 'body'), async (req, res) => {
  submitFormPostRequest(req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addFulfillmentStatusPayload(data);
  });
});

app.post('/volunteers', validationMiddleware(schemas.volunteer, 'body'), async (req, res) => {
  submitFormPostRequest(req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
  });
});

async function submitFormPostRequest(req, res, prepare) {
  const data = req.body;
  try {
    await prepareAndAddToFirebase('volunteers', data, prepare);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
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
      const mapsError = new Error('Geocode was not successful for the following reason: ' + status);
      console.error(mapsError);
      addToFirebase(ref, data);
    }
  } catch (err) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
}

function geocode(address) {
  return mapsClient.geocode({
    params: {
      address: address,
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
      .push(data, err => {
        if (err) {
          throw new Error('error writing to database');
        }
      });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

function addLocationPayload(geocodeResult, data) {
  const location = geocodeResult.geometry.location;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
}

function addFulfillmentStatusPayload(data) {
  data.fulfillment_status = fulfillment_status.NEW;
  data.fulfillment_status_timestamp = firebase.database.ServerValue.TIMESTAMP;
}

app.get('/requesters', (req, res) => {
  getRequest('requesters', req, res);
});

app.get('/volunteers', (req, res) => {
  getRequest('volunteers', req, res);
});

function getRequest(ref, req, res) {
  try {
    firebase
      .database()
      .ref(ref)
      .once('value', snapshot => {
        res.status(200).send(snapshot.val());
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = app;
