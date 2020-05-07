import { submitForm, addLocationPayload, addNamePayload } from '../utils/api';

const VOLUNTEERS_REF = 'volunteers';

const postVolunteer = async (data) => {
  await submitForm(VOLUNTEERS_REF, data, (geocodeResult) => {
    addLocationPayload(geocodeResult, data);
    addNamePayload(data);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { postVolunteer };
