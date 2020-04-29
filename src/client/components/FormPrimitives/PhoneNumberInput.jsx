import { useField } from 'formik';
import PhoneInput from 'react-phone-number-input';

const PhoneNumberInput = ({
  label,
  isRequired = true,
  colWidth = '13',
  inputType = 'short',
  ...props
}) => {
  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }
  const [field, meta, helpers] = useField(props);

  return (
    <div className={`form-group mb-3 mb-md-2 col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      {isRequired ? (
        <PhoneInput
          required
          className="form-control"
          defaultCountry="US"
          placeholder={props.placeholder}
          onChange={(phone) => helpers.setValue(phone)}
        />
      ) : (
        <PhoneInput
          className="form-control"
          defaultCountry="US"
          placeholder={props.placeholder}
          onChange={(phone) => helpers.setValue(phone)}
        />
      )}

      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default PhoneNumberInput;
