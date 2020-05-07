import firebase from './firebase/client';
import { FULFILLMENT_STATUS } from '../constants';

const geocode = (address, onSuccess) => {
  try {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      return onSuccess(results, status);
    });
  } catch (err) {
    throw new Error('error geocoding');
  }
};

const addToFirebase = async (ref, data) => {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  return firebase.database().ref(ref).push(data);
  // .catch((err) => {
  //   console.log('caught', err.message);
  //   throw err;
  // });
};

const prepareAndAddToFirebase = (ref, data, prepare) => {
  geocode(data.address, (results, status) => {
    if (status === 'OK') {
      prepare(results[0]);
      addToFirebase(ref, data);
    } else {
      const mapsError = new Error(`Geocode was not successful for the following reason: ${status}`);
      console.error(mapsError);
      addToFirebase(ref, data);
    }
  });
};

const submitForm = async (ref, data, prepare) => {
  try {
    await prepareAndAddToFirebase(ref, data, prepare);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addLocationPayload = (geocodeResult, data) => {
  console.log(geocodeResult);
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
