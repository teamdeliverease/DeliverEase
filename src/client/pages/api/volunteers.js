import * as firebase from 'firebase';
import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
  getFromFirebase,
} from '../../utils/routeHelpers';
import validationMiddleware from '../../utils/middleware/validationMiddleware';
import { volunteer as volunteerSchema } from '../../utils/schemas';
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
  } catch (err) {
    return res.send({ error: err.message });
  }
};

const get = async (req, res) => {
  try {
    firebase
      .database()
      .ref('volunteers')
      .once(
        'value',
        (snapshot) => {
          console.log(snapshot.val());
          res.status(200).json(snapshot.val());
        },
        (err) => {
          console.error(err);
          res.status(500).send('fuck');
        },
      );
    // const data = await getFromFirebase(VOLUNTEERS_REF, res);
    // return res.json(data);
  } catch (err) {
    return res.send({ error: err.message });
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
