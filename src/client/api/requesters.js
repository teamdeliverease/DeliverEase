import {
  submitForm,
  getLocationPayload,
  getNamePayload,
  getFulfillmentStatusPayload,
  get,
  update,
} from '../utils/api';
import firebase from '../utils/firebase/client';

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
  return get(REQUESTERS_REF);
};

const updateRequestStatus = (requestId, status) => {
  update(REQUESTERS_REF.requestId, {
    fulfillment_status: status,
    fulfillment_status_timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
};

export { postRequest, getRequests, updateRequestStatus };
