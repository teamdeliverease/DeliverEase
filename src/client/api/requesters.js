import {
  submitForm,
  getLocationPayload,
  getNamePayload,
  getFulfillmentStatusPayload,
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

// eslint-disable-next-line import/prefer-default-export
export { postRequest };
