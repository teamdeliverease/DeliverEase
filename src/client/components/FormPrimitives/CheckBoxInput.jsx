import { useField } from 'formik';

const CheckBoxInput = ({ label, isRequired = true, ...props }) => {
  props.type = props.type || 'text';
  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }
  const [field, meta, helpers] = useField(props);

  return (
    <div className="form-group mb-3 mb-md-2">
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      <div className="form-check mb-3 full-width">
        <input
          required={isRequired}
          type="checkbox"
          className="form-check-input"
          onChange={(event) => helpers.setValue(event.target.checked)}
        />
        <label className="form-check-label" htmlFor="requester-terms">
          {props.children}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInput;
