// import {
//   submitFormPostRequest,
//   addLocationPayload,
//   addNamePayload,
//   addFulfillmentStatusPayload,
// } from '../../utils/routeHelpers';
// import validationMiddleware from '../../utils/middleware/validationMiddleware';
// import { requester as requesterSchema } from '../../utils/schemas';
// import { REQUESTERS_REF } from '../../constants';

// export const config = {
//   api: {
//     bodyParser: process.env.NODE_ENV !== 'production',
//   },
// };

// const handler = async (req, res) => {
//   if (!req.body) {
//     return res.status(400);
//   }

//   await validationMiddleware(req, res, requesterSchema);
//   return submitFormPostRequest(REQUESTERS_REF, req, res, (geocodeResult, data) => {
//     addLocationPayload(geocodeResult, data);
//     addFulfillmentStatusPayload(data);
//     addNamePayload(data);
//   });
// };

// export default handler;
