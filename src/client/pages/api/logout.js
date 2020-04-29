import commonMiddleware from '../../utils/middleware/commonMiddleware';

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== 'production',
  },
};

const handler = (req, res) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  req.session = null;
  res.status(200).json({ status: true });
};

export default commonMiddleware(handler);
