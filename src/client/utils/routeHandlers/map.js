// From:
// https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const getVolunteers = async () => {
  const token = await firebase.auth().currentUser.getIdToken();
  return axios.get('/api/volunteers', {
    headers: {
      credentials: 'same-origin',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getVolunteers;
