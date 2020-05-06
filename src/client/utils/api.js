// import * as functions from 'firebase-functions';
// import { Client } from '@googlemaps/google-maps-services-js';
import { Loader } from '@googlemaps/js-api-loader';
// import GoogleMapsApi from './googleMaps';
import firebase from './firebase/client';
import { FULFILLMENT_STATUS, MAPS_API_KEY } from '../constants';

const geocode = async (address, onComplete) => {
  try {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      onComplete({ results, status });
    });
  } catch (err) {
    console.error(err);
    throw new Error('error geocoding');
  }
};

// return loader
//   .load()
//   .then(() => {
//     // eslint-disable-next-line no-undef
//     const geocoder = new google.maps.Geocoder();

//     return geocoder.geocode({ address }, function (results, status) {
//       console.log(results, status);
//       return { results, status };
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// };

const addToFirebase = (ref, data) => {
  try {
    data.timestamp = firebase.database.ServerValue.TIMESTAMP;
    firebase
      .database()
      .ref(ref)
      .push(data, (err) => {
        if (err) {
          console.error(err);
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
    // const result = geocode(data.address);
    geocode(data.address, (results, status) => {
      if (status === 'OK') {
        prepare(results[0]);
        addToFirebase(ref, data);
      } else {
        const mapsError = new Error(
          `Geocode was not successful for the following reason: ${status}`,
        );
        console.error(mapsError);
        addToFirebase(ref, data);
      }
    });
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
