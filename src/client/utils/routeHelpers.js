import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Client } from '@googlemaps/google-maps-services-js';
import { GENERIC_ERROR_MESSAGE, FULFILLMENT_STATUS } from '../constants';

const geocode = (address) => {
  const mapsClient = new Client({});
  return mapsClient.geocode({
    params: {
      address,
      key: functions.config().apikeys.maps,
    },
  });
};

const addToFirebase = (ref, data) => {
  try {
    data.timestamp = admin.database.ServerValue.TIMESTAMP;
    admin
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
};

const prepareAndAddToFirebase = async (ref, data, prepare) => {
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
    console.error(err);
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
};

const submitFormPostRequest = async (ref, req, res, prepare) => {
  const data = req.body;
  try {
    await prepareAndAddToFirebase(ref, data, prepare);
    console.log('sending');
    res.status(200).end();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addLocationPayload = (geocodeResult, data) => {
  const { location } = geocodeResult.geometry;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
};

const addFulfillmentStatusPayload = (data) => {
  data.fulfillment_status = FULFILLMENT_STATUS.NEW;
  data.fulfillment_status_timestamp = admin.database.ServerValue.TIMESTAMP;
};

const addNamePayload = (data) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  return Object.assign(data, { name: fullName });
};

export { submitFormPostRequest, addLocationPayload, addFulfillmentStatusPayload, addNamePayload };
