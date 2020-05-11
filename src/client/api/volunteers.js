import { submitForm, addLocationPayload, addNamePayload, get } from '../utils/api';

const VOLUNTEERS_REF = 'volunteers';

const postVolunteer = (data) => {
  return submitForm(VOLUNTEERS_REF, data, (geocodeResult) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
};

const getVolunteers = () => {
  return get(VOLUNTEERS_REF);
};

export { postVolunteer, getVolunteers };
