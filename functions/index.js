const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;
const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    process.env.CUSTOM_ENV === 'dev'
      ? 'https://deliverease-f9eec-staging.firebaseio.com/'
      : 'https://deliverease-f9eec.firebaseio.com/',
});
const mapsClient = new googleMapsClient({});

// initialize express app
const app = express();
// Automatically allow cross-origin requests
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/submit/volunteer', (request, response) => {
//   // console.log(functions.config().someservice.id);

//   console.log(process.env.FIREBASE_CONFIG);

//   response.send(config);
// });

app.post('/requesters', async (req, res) => {
  const data = req.body;

  // TODO: insert server side validation

  mapsClient
    .geocode({
      params: {
        address: '425 Wessex Way, Belmont, CA 94002',
        key: 'AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c',
      },
    })
    .then(result => {
      const { results, status } = result.data;
      if (status === 'OK') {
        var location = results[0].geometry.location;
        data.address = results[0].formatted_address;
        data.lat = location.lat;
        data.lng = location.lng;
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
    .catch(err => console.log(err));
});

function addToFirebase(ref, data) {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  if ('fulfillment_status_timestamp' in data) {
    data.fulfillment_status_timestamp = data.timestamp;
  }
  firebase
    .database()
    .ref(ref)
    .push(data, err => {
      if (err) {
        throw new Error('error writing to database');
      }
    });
}

exports.app = functions.https.onRequest(app);
