import { listen, submitForm, getLocationPayload, getNamePayload } from '../utils/api';

const VOLUNTEERS_REF = 'volunteers';

const postVolunteer = (data) => {
  return submitForm(VOLUNTEERS_REF, data, (geocodeResult) => {
    const preparedData = {
      ...data,
      ...getNamePayload(data),
    };

    if (geocodeResult) {
      return { ...preparedData, ...getLocationPayload(geocodeResult) };
    }
    return preparedData;
  });
};

const listenForVolunteers = (callback) => {
  listen(VOLUNTEERS_REF, callback);
};

export { postVolunteer, listenForVolunteers };
