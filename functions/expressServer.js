const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const firebaseAuth = require('firebase-auth');
const express = require('express');
const validationMiddleware = require('./validationMiddleware.js');
const schemas = require('./schemas.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;
const checkIfAuthenticated = require('./authMiddleware.js');
const path = require('path');

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
  submitFormPostRequest('requesters', req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addFulfillmentStatusPayload(data);
    addNamePayload(data);
  });
});

app.post('/volunteers', validationMiddleware(schemas.volunteer, 'body'), async (req, res) => {
  submitFormPostRequest('volunteers', req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
});

// app.post('/login', checkIfAuthenticated, async (req, res) => {
//   res.redirect('/map');
// });

// app.get('/map', checkIfAuthenticated, async (req, res) => {
//   res.sendFile(path.join(__dirname, '/private/map.html'));
// });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Whenever a user is accessing restricted content that requires authentication.
app.post('/map', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  firebase
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      return express.static(path.join(__dirname, 'private/map'));
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect('/login');
    });
});

app.post('/sessionLogin', (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  firebase
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      },
    );
});

async function submitFormPostRequest(ref, req, res, prepare) {
  const data = req.body;
  try {
    await prepareAndAddToFirebase(ref, data, prepare);
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

function addNamePayload(data) {
  const fullName = `${data.firstName} ${data.lastName}`;
  return Object.assign(data, { name: fullName });
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
      .once('value', (snapshot) => {
        res.status(200).send(snapshot.val());
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = app;
