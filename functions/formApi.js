const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;
const serviceAccount = require('./serviceAccountKey.json');

if (!process.env.DB_URL) {
  // If no DB env is set, use server defaults
  firebase.initializeApp();
} else {
  // If we're local use specified DB env and credentials
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL,
  });
}

const mapsClient = new googleMapsClient({});
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const fulfillment_status = {
  NEW: 'new',
  SOURCING_VOLUNTEER: 'sourcing_volunteer',
  PENDING_FULFILLMENT: 'pending_fullfilment',
  FULFILLING: 'fulfilling',
  COMPLETE: 'complete',
};

app.post('/requesters', async (req, res) => {
  const data = req.body;
  validateData(data);

  geocode(data.address)
    .then(result => {
      const { results, status } = result.data;
      if (status === 'OK') {
        addLocationPayload(results[0], data);
        addFulfillmentStatusPayload(data);
        try {
          addToFirebase('requesters', data);
          return res.sendStatus(200);
        } catch (e) {
          console.error(e.message);
          return res.send(e.message);
        }
      } else {
        const mapsError = 'Geocode was not successful for the following reason: ' + status;
        console.error(mapsError);
        return res.send(mapsError);
      }
    })
    .catch(err => console.error(err));
});

app.post('/volunteers', async (req, res) => {
  const data = req.body;
  validateData(data);

  geocode(data.address)
    .then(result => {
      const { results, status } = result.data;
      if (status === 'OK') {
        addLocationPayload(results[0], data);
        try {
          addToFirebase('volunteers', data);
          return res.sendStatus(200);
        } catch (e) {
          console.error(e.message);
          return res.send(e.message);
        }
      } else {
        const mapsError = 'Geocode was not successful for the following reason: ' + status;
        console.error(mapsError);
        return res.send(mapsError);
      }
    })
    .catch(err => console.error(err));
});

function geocode(address) {
  return mapsClient.geocode({
    params: {
      address: address,
      key: 'AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c',
    },
  });
}

function addLocationPayload(geocodeResult, data) {
  var location = geocodeResult.geometry.location;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
}

function addFulfillmentStatusPayload(data) {
  data.fulfillment_status = fulfillment_status.NEW;
  data.fulfillment_status_timestamp = firebase.database.ServerValue.TIMESTAMP;
}

function validateData(data) {
  // TODO validate server side
}

function addToFirebase(ref, data) {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  firebase
    .database()
    .ref(ref)
    .push(data, err => {
      if (err) {
        throw new Error('error writing to database');
      }
    });
}

module.exports = app;
