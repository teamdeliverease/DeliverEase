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

app.post('/requesters', validationMiddleware(schemas.requester, 'body'), async (req, res) => {
  const data = req.body;
  geocode(data.address)
    .then((result) => {
      const { results, status } = result.data;
      if (status === 'OK') {
        addLocationPayload(results[0], data);
        addFulfillmentStatusPayload(data);
        try {
          addToFirebase('requesters', data);
          return res.sendStatus(200);
        } catch (e) {
          console.error(e);
          return res.status(500).send(e.message);
        }
      } else {
        const mapsError = new Error(
          'Geocode was not successful for the following reason: ' + status,
        );
        console.error(mapsError);
        return res.status(500).send(mapsError.message);
      }
    })
    .catch((err) => console.error(err));
});

app.post('/volunteers', validationMiddleware(schemas.volunteer, 'body'), async (req, res) => {
  const data = req.body;
  geocode(data.address)
    .then((result) => {
      const { results, status } = result.data;
      if (status === 'OK') {
        addLocationPayload(results[0], data);
        try {
          addToFirebase('volunteers', data);
          return res.sendStatus(200);
        } catch (e) {
          console.error(e);
          return res.status(500).send(e.message);
        }
      } else {
        const mapsError = new Error(
          'Geocode was not successful for the following reason: ' + status,
        );
        console.error(mapsError);
        return res.status(500).send(mapsError.message);
      }
    })
    .catch((err) => console.error(err));
});

function geocode(address) {
  return mapsClient.geocode({
    params: {
      address: address,
      key: functions.config().apikeys.maps,
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

function addToFirebase(ref, data) {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  firebase
    .database()
    .ref(ref)
    .push(data, (err) => {
      if (err) {
        throw new Error('error writing to database');
      }
    });
}

module.exports = app;
