import { Formik, Form } from 'formik';

import TextInput from '../FormPrimitives/TextInput';
// import PhoneInput from '../FormPrimitives/PhoneInput';
// import AddressInput from '../FormPrimitives/AddressInput';
import LanguageSelector from '../FormPrimitives/LanguageSelector';

const RequestForm = () => {
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
      }}
    >
      <div className="form-wrapper">
        <Form className="text-center flex-wrap px-lg-5">
          <div className="form-row">
            <TextInput colWidth="6" maxlength="64" name="firstName" placeholder="First Name" />
            <TextInput colWidth="6" maxlength="64" name="lastName" placeholder="Last Name" />
          </div>
          <TextInput maxlength="16" type="tel" name="phoneNumber" placeholder="Phone Number" />
          {/* <AddressInput name="address" type="text" placeholder="Street Address" /> */}
          {/* <TextInput name="email" type="email" placeholder="Email" /> */}
          <TextInput
            inputType="long"
            maxlength="1024"
            rows="4"
            name="shoppingList"
            placeholder="Enter shopping list here"
          />
          <LanguageSelector />
          <button className="btn btn-primary btn-submit mx-auto" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default RequestForm;
