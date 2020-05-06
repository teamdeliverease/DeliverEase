import * as functions from 'firebase-functions';
import { Client } from '@googlemaps/google-maps-services-js';
import firebase from './firebase/client';
import { FULFILLMENT_STATUS } from '../constants';

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
    throw err;
  }
};

const prepareAndAddToFirebase = async (ref, data, prepare) => {
  try {
    const result = await geocode(data.address);
    const { results, status } = result.data;
    if (status === 'OK') {
      prepare(results[0]);
      addToFirebase(ref, data);
    } else {
      const mapsError = new Error(`Geocode was not successful for the following reason: ${status}`);
      console.error(mapsError);
      addToFirebase(ref, data);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const submitForm = async (ref, data, prepare) => {
  await prepareAndAddToFirebase(ref, data, prepare);
};

const addLocationPayload = (geocodeResult, data) => {
  const { location } = geocodeResult.geometry;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
};

const addFulfillmentStatusPayload = (data) => {
  data.fulfillment_status = FULFILLMENT_STATUS.NEW;
  data.fulfillment_status_timestamp = firebase.database.ServerValue.TIMESTAMP;
};

const addNamePayload = (data) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  return Object.assign(data, { name: fullName });
};

export {
  submitForm,
  addLocationPayload,
  addFulfillmentStatusPayload,
  addNamePayload,
  prepareAndAddToFirebase,
};
