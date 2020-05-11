import { Formik, Form } from 'formik';
import { GENERIC_ERROR_MESSAGE } from '../../constants';
import TextInput from '../FormPrimitives/TextInput';
import PhoneNumberInput from '../FormPrimitives/PhoneNumberInput';
import AddressInput from '../FormPrimitives/AddressInput';
import SelectInput from '../FormPrimitives/SelectInput';
import CheckBoxInput from '../FormPrimitives/CheckBoxInput';
import Modal from '../Modal';
import RequestTermsOfUse from '../FormPrimitives/RequestTermsOfUse';
import { trackSignUp } from '../../utils/analytics';
import { postRequest } from '../../api/requesters';

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Mandarin', label: 'Mandarin' },
  { value: 'Cantonese', label: 'Cantonese' },
  { value: 'Other', label: 'Other' },
];

const RequestForm = ({ onSubmitted }) => {
  const handleSubmit = async (formData, setSubmitting) => {
    try {
      // disable submit button while waiting on api call
      setSubmitting(true);
      // TODO: change this to just take in formData when forms are properly hooked up
      await postRequest({
        ...formData,
        phone: '+19162061598',
        termsAgreement: true,
      });

      onSubmitted();
      trackSignUp('requester');
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert(GENERIC_ERROR_MESSAGE);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        list: '',
        language: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {(props) => (
        <div className="form-wrapper">
          <Form className="text-center flex-wrap px-lg-5">
            <div className="form-row">
              <TextInput colWidth="6" maxLength="64" name="firstName" placeholder="First Name" />
              <TextInput colWidth="6" maxLength="64" name="lastName" placeholder="Last Name" />
            </div>
            <PhoneNumberInput name="phone" placeholder="Phone Number" />
            <AddressInput name="address" id="requesterAddress" placeholder="Street Address" />
            <TextInput
              maxLength="256"
              isRequired={false}
              type="email"
              name="email"
              placeholder="Email"
            />
            <SelectInput name="language" options={languageOptions} placeholder="Languages Spoken" />
            <TextInput
              inputType="long"
              maxLength="1024"
              rows="4"
              name="list"
              placeholder="Enter shopping list here"
            />
            <CheckBoxInput name="termsOfUse">
              <>
                I agree to the{' '}
                <Modal
                  title="Requester Terms and Conditions"
                  linkText="Terms of Use"
                  linkColor="blue"
                >
                  <RequestTermsOfUse />
                </Modal>
              </>
            </CheckBoxInput>
            <button
              disabled={props.isSubmitting}
              className="btn btn-primary btn-submit mx-auto"
              type="submit"
            >
              Submit Request
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RequestForm;
