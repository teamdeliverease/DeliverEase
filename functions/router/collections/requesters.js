const router = express.Router();
const utils = require('../../utils.js');

const REQUESTERS = 'requesters';

const fulfillment_status = {
  NEW: 'new',
  SOURCING_VOLUNTEER: 'sourcing_volunteer',
  PENDING_FULFILLMENT: 'pending_fullfilment',
  FULFILLING: 'fulfilling',
  COMPLETE: 'complete',
};

app.post('/', validationMiddleware(schemas.requester, 'body'), async (req, res) => {
  uitls.submitFormPostRequest(REQUESTERS, req, res, (geocodeResult, data) => {
    utils.addLocationPayload(geocodeResult, data);
    utils.addFulfillmentStatusPayload(data);
  });
});

app.get('/', (req, res) => {
  utils.getRequest(REQUESTERS, req, res);
});

module.exports = { router };
