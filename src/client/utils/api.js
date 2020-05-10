import firebase from './firebase/client';
import { FULFILLMENT_STATUS } from '../constants';
import { GeocodeError } from '../api/errorTypes';

/* eslint-disable no-undef */
const geocode = (address) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(new GeocodeError(status));
      }
    });
  });
};
/* eslint-enable no-undef */

const addToFirebase = (ref, data) => {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  return firebase.database().ref(ref).push(data);
};

const prepareAndAddToFirebase = (ref, data, prepare) => {
  return geocode(data.address)
    .then((results) => {
      prepare(results[0]);
      return addToFirebase(ref, data);
    })
    .catch((err) => {
      if (err instanceof GeocodeError) {
        return addToFirebase(ref, data);
      }
      throw err;
    });
};

const submitForm = (ref, data, prepare) => {
  return prepareAndAddToFirebase(ref, data, prepare);
};

const addLocationPayload = (geocodeResult, data) => {
  const { location } = geocodeResult.geometry;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat();
  data.lng = location.lng();
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
