import cookieSession from './cookieSession';
import cookieSessionRefresh from './cookieSessionRefresh';

// Load environment variables.
require('../../../../env');

export default (req, res) => {
  cookieSessionRefresh(req);
  cookieSession(res, req);
};
