// From:
// https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import axios from 'axios';

const setSession = (user) => {
  // Log in.
  if (user) {
    return user.getIdToken().then((token) => {
      console.log(token);
      return axios.post('/api/login', { token }, { credentials: 'same-origin' });
    });
  }

  // Log out.
  return axios.post('/api/logout', {}, { credentials: 'same-origin' });
};

export default setSession;
