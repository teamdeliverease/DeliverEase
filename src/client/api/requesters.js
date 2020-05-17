import {
  submitForm,
  getLocationPayload,
  getNamePayload,
  getFulfillmentStatusPayload,
  get,
} from '../utils/api';

const REQUESTERS_REF = 'requesters';

const postRequest = (data) => {
  return submitForm(REQUESTERS_REF, data, (geocodeResult) => {
    return {
      ...data,
      ...getLocationPayload(geocodeResult),
      ...getFulfillmentStatusPayload(),
      ...getNamePayload(data),
    };
  });
};

const getRequests = () => {
  get(REQUESTERS_REF);
};

export { postRequest, getRequests };
