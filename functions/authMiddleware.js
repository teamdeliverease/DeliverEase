const firebaseAdmin = require('firebase-admin');

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const sessionCookie = req.cookies.__session || '';
      const userInfo = await firebaseAdmin.auth().verifyIdToken(sessionCookie);
      req.authId = userInfo.uid;
      next();
    } catch (e) {
      return res.status(401).send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = checkIfAuthenticated;
