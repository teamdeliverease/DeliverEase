import { get, submitForm, getLocationPayload, getNamePayload } from '../utils/api';

const VOLUNTEERS_REF = 'volunteers';

const postVolunteer = (data) => {
  return submitForm(VOLUNTEERS_REF, data, (geocodeResult) => {
    return {
      ...data,
      ...getLocationPayload(geocodeResult),
      ...getNamePayload(data),
    };
  });
};

const getVolunteers = () => {
  return get(VOLUNTEERS_REF);
};

export { postVolunteer, getVolunteers };
