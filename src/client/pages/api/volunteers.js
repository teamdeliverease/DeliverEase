import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
  getFromFirebase,
} from '../../utils/routeHelpers';
import validationMiddleware from '../../utils/middleware/validationMiddleware';
import { volunteer as volunteerSchema } from '../../utils/schemas';
import commonMiddleware from '../../utils/middleware/commonMiddleware';
import { VOLUNTEERS_REF } from '../../constants';

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== 'production',
  },
};

const post = async (req, res) => {
  if (!req.body) {
    return res.status(400);
  }
  try {
    await validationMiddleware(req, res, volunteerSchema);
    return submitFormPostRequest(VOLUNTEERS_REF, req, res, (geocodeResult, data) => {
      addLocationPayload(geocodeResult, data);
      addNamePayload(data);
    });
  } catch (e) {
    return e;
  }
};

const get = async (req, res) => {
  try {
    await commonMiddleware(req, res);
    return getFromFirebase(VOLUNTEERS_REF, res);
  } catch (e) {
    return e;
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      post(req, res);
      break;
    case 'GET':
      get(req, res);
      break;
    default:
      break;
  }
};

export default handler;
