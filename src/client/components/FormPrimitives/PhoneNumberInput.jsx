import { useField } from 'formik';
import PhoneInput from 'react-phone-input-2';

const PhoneNumberInput = ({
  label,
  isRequired = true,
  colWidth = '13',
  inputType = 'short',
  ...props
}) => {
  props.type = props.type || 'text';
  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }
  const [field, meta, helpers] = useField(props);

  return (
    <div className={`form-group mb-3 mb-md-2 col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      <PhoneInput
        inputExtraProps={{
          required: true,
        }}
        country={'us'}
        // value={this.state.phone}
        onChange={(phone) => helpers.setValue(phone)}
      />

      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default PhoneNumberInput;
