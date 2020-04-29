import { Formik, Form } from 'formik';

import TextInput from '../FormPrimitives/TextInput';
import PhoneNumberInput from '../FormPrimitives/PhoneNumberInput';
import AddressInput from '../FormPrimitives/AddressInput';
import SelectInput from '../FormPrimitives/SelectInput';

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Mandarin', label: 'Mandarin' },
  { value: 'Cantonese', label: 'Cantonese' },
  { value: 'Other', label: 'Other' },
];

const RequestForm = ({ onSubmit, submitDisabled }) => {
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
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
        onSubmit(values);
      }}
    >
      <div className="form-wrapper">
        <Form className="text-center flex-wrap px-lg-5">
          <div className="form-row">
            <TextInput colWidth="6" maxLength="64" name="firstName" placeholder="First Name" />
            <TextInput colWidth="6" maxLength="64" name="lastName" placeholder="Last Name" />
          </div>
          <PhoneNumberInput maxLength="16" name="phone" placeholder="Phone Number" />
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
            name="list"
            placeholder="Enter shopping list here"
          />
          <button
            disabled={submitDisabled}
            className="btn btn-primary btn-submit mx-auto"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default RequestForm;
