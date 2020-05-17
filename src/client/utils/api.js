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
  const dataWithTimestamp = { ...data, timestamp: firebase.database.ServerValue.TIMESTAMP };

  return firebase.database().ref(ref).push(dataWithTimestamp);
};

const prepareAndAddToFirebase = (ref, data, prepare) => {
  return geocode(data.address)
    .then((results) => {
      return addToFirebase(ref, prepare(results[0]));
    })
    .catch((err) => {
      if (err instanceof GeocodeError) {
        return addToFirebase(ref, prepare());
      }
      throw err;
    });
};

const submitForm = (ref, data, prepare) => {
  return prepareAndAddToFirebase(ref, data, prepare);
};

const getLocationPayload = (geocodeResult) => {
  const { location } = geocodeResult.geometry;

  return {
    address: geocodeResult.formatted_address,
    lat: location.lat(),
    lng: location.lng(),
  };
};

const getFulfillmentStatusPayload = () => {
  return {
    fulfillment_status: FULFILLMENT_STATUS.NEW,
    fulfillment_status_timestamp: firebase.database.ServerValue.TIMESTAMP,
  };
};

const getNamePayload = (data) => {
  const fullName = `${data.firstName} ${data.lastName}`;

  return { name: fullName };
};

const get = (ref) => {
  return firebase
    .database()
    .ref(ref)
    .once('value', (snapshot) => {
      return snapshot.val();
    });
};

export {
  submitForm,
  getLocationPayload,
  getFulfillmentStatusPayload,
  getNamePayload,
  prepareAndAddToFirebase,
  get,
};
