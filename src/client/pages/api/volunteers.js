import {
  submitFormPostRequest,
  addLocationPayload,
  addNamePayload,
  // getFromFirebase,
} from '../../utils/routeHelpers';
import validationMiddleware from '../../utils/middleware/validationMiddleware';
import { volunteer as volunteerSchema } from '../../utils/schemas';
import { VOLUNTEERS_REF } from '../../constants';
import { db, admin } from '../../utils/firebase/admin';

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

// const getAuthToken = (req, res, next) => {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//     req.authToken = req.headers.authorization.split(' ')[1];
//   } else {
//     req.authToken = null;
//   }
//   next();
// };

// export const checkIfAuthenticated = (req, res, next) => {
//   getAuthToken(req, res, async () => {
//     try {
//       const { authToken } = req;
//       const userInfo = await admin.auth().verifyIdToken(authToken);
//       req.authId = userInfo.uid;
//       return next();
//     } catch (e) {
//       return res.status(401).send({ error: 'You are not authorized to make this request' });
//     }
//   });
// };

const get = async (req, res) => {
  try {
    let authToken;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      // eslint-disable-next-line prefer-destructuring
      authToken = req.headers.authorization.split(' ')[1];
    } else {
      authToken = null;
    }

    await admin
      .auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        req.user = decodedToken;
      })
      .catch((err) => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err);
      });

    await admin
      .auth()
      .getUser(req.user.uid)
      .then((userRecord) => {
        // The claims can be accessed on the user record.
        console.log(userRecord);
      });

    try {
      db.ref('volunteers').once(
        'value',
        (snapshot) => {
          console.log(snapshot.val());
          res.status(200).json(snapshot.val());
        },
        (err) => {
          console.error(err);
          res.status(500).send(err.message);
        },
      );
      // const data = await getFromFirebase(VOLUNTEERS_REF, res);
      // return res.json(data);
    } catch (err) {
      console.error(err.message);
      return res.send({ error: err.message });
    }
    // console.log(response.data);
    // res.status(200).json(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(401).send({ error: 'You are not authorized to make this request' });
  }

  // firebase.app().database().ref();

  // try {
  //   firebase
  //     .app()
  //     .database()
  //     .ref('volunteers')
  //     .once(
  //       'value',
  //       (snapshot) => {
  //         // console.log(snapshot.val());
  //         res.status(200).json(snapshot.val());
  //       },
  //       (err) => {
  //         console.error(err);
  //         res.status(500).send(err.message);
  //       },
  //     );
  //   // const data = await getFromFirebase(VOLUNTEERS_REF, res);
  //   // return res.json(data);
  // } catch (err) {
  //   return res.send({ error: err.message });
  // }
  return null;
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
