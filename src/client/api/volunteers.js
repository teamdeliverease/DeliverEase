import { submitForm, addLocationPayload, addNamePayload } from '../utils/routeHelpers';

const VOLUNTEERS_REF = 'volunteers';

const postVolunteer = (data) => {
  return submitForm(VOLUNTEERS_REF, data, (geocodeResult) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { postVolunteer };
