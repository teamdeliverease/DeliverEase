import { Formik, Form } from 'formik';

import TextInput from '../FormPrimitives/TextInput';
import PhoneNumberInput from '../FormPrimitives/PhoneNumberInput';
import AddressInput from '../FormPrimitives/AddressInput';
import SelectInput from '../FormPrimitives/SelectInput';
import CheckBoxInput from '../FormPrimitives/CheckBoxInput';
import Modal from '../Modal';
import RequestTermsOfUse from '../FormPrimitives/RequestTermsOfUse';

const languageOptions = [
  { value: 'enlish', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'other', label: 'Other' },
];

const RequestForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        shoppingList: '',
        language: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
        onSubmit();
      }}
    >
      <div className="form-wrapper">
        <Form className="text-center flex-wrap px-lg-5">
          <div className="form-row">
            <TextInput colWidth="6" maxLength="64" name="firstName" placeholder="First Name" />
            <TextInput colWidth="6" maxLength="64" name="lastName" placeholder="Last Name" />
          </div>
          <PhoneNumberInput maxLength="16" name="phoneNumber" placeholder=" Phone Number" />
          <AddressInput name="address" placeholder="Street Address" />
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
            name="shoppingList"
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
          <button className="btn btn-primary btn-submit mx-auto" type="submit">
            Submit Request
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default RequestForm;
