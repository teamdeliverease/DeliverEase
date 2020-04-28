import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
  addFulfillmentStatusPayload,
} from '../../utils/routeHelpers';
import validationMiddleware from '../../utils/middleware/validationMiddleware';
import { requester as requesterSchema } from '../../utils/schemas';

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== 'production',
  },
};

const handler = (req, res) => {
  if (!req.body) {
    return res.status(400);
  }

  return submitFormPostRequest('requesters', req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addFulfillmentStatusPayload(data);
    addNamePayload(data);
  });
};

export default validationMiddleware(handler, requesterSchema);
