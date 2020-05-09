import {
  submitForm,
  addLocationPayload,
  addNamePayload,
  addFulfillmentStatusPayload,
} from '../utils/api';

const REQUESTERS_REF = 'requesters';

const postRequester = (data) => {
  return submitForm(REQUESTERS_REF, data, (geocodeResult) => {
    addLocationPayload(geocodeResult, data);
    addFulfillmentStatusPayload(data);
    addNamePayload(data);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { postRequester };
