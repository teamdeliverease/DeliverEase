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
    const preparedData = {
      ...data,
      ...getFulfillmentStatusPayload(),
      ...getNamePayload(data),
    };

    if (geocodeResult) {
      return { ...preparedData, ...getLocationPayload(geocodeResult) };
    }
    return preparedData;
  });
};

const getRequests = () => {
  get(REQUESTERS_REF);
};

export { postRequest, getRequests };
