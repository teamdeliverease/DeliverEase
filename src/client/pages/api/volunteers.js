// import {
//   submitFormPostRequest,
//   addLocationPayload,
//   addNamePayload,
// } from '../../utils/routeHelpers';
// import initFirebase from '../../utils/auth/initFirebase';
// import validationMiddleware from '../../utils/middleware/validationMiddleware';

// Init the Firebase app.
// initFirebase();

export default (req, res) => {
  return res.status(200).json({ status: 'OK' });
};

// export default async (req, res) => {
//   if (!req.body) {
//     return res.status(400);
//   }

//   submitFormPostRequest('volunteers', req, res, (geocodeResult, data) => {
//     addLocationPayload(geocodeResult, data);
//     addNamePayload(data);
//   });
// };

// // TODO: add validation middleware to export
// export default handler;
