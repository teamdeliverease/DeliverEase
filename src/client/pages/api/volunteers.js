import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
} from '../../utils/routeHelpers';
import validationMiddleware from '../../utils/middleware/validationMiddleware';
import { volunteer as volunteerSchema } from '../../utils/schemas';

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== 'production',
  },
};

const handler = (req, res) => {
  if (!req.body) {
    return res.status(400);
  }

  return submitFormPostRequest('volunteers', req, res, (geocodeResult, data) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
};

export default validationMiddleware(handler, volunteerSchema);