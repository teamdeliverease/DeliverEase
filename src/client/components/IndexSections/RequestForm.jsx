import { Formik, Form } from 'formik';

import TextInput from '../FormPrimitives/TextInput';
// import PhoneInput from '../FormPrimitives/PhoneInput';
// import AddressInput from '../FormPrimitives/AddressInput';
import SelectInput from '../FormPrimitives/SelectInput';

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
          <TextInput maxLength="16" type="tel" name="phoneNumber" placeholder="Phone Number" />
          {/* <AddressInput name="address" type="text" placeholder="Street Address" /> */}
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
          <button className="btn btn-primary btn-submit mx-auto" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default RequestForm;
