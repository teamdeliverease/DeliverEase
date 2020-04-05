const router = express.Router();
const utils = require('../../utils.js');

const VOLUNTEERS = 'volunteers';

app.post('/', validationMiddleware(schemas.volunteer, 'body'), async (req, res) => {
  uitls.submitFormPostRequest(VOLUNTEERS, req, res, (geocodeResult, data) => {
    utils.addLocationPayload(geocodeResult, data);
  });
});

app.get('/', (req, res) => {
  utils.getRequest(VOLUNTEERS, req, res);
});

module.exports = { router };
