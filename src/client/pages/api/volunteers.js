import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
} from '../../utils/routeHelpers';
// import initFirebase from '../../utils/auth/initFirebase';
// import validationMiddleware from '../../utils/middleware/validationMiddleware';

// Init the Firebase app.
// initFirebase();

const handler = (req, res) => {
  console.log('hello');
  if (!req.body) {
    return res.status(400);
  }
  // initFirebase();

  return submitFormPostRequest('volunteers', req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
};

// TODO: add validation middleware to export
export default handler;
