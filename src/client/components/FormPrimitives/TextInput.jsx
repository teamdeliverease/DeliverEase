import { useField } from 'formik';

const shortTextInput = (isRequired, field, props) => {
  return isRequired ? (
    <input required className="form-control" {...field} {...props} />
  ) : (
    <input className="form-control" {...field} {...props} />
  );
};

const longTextInput = (isRequired, field, props) => {
  return isRequired ? (
    <textarea required className="form-control" {...field} {...props} />
  ) : (
    <textarea className="form-control" {...field} {...props} />
  );
};

const TextInput = ({
  label,
  isRequired = true,
  colWidth = '13',
  inputType = 'short',
  ...props
}) => {
  props.type = props.type || 'text';
  const [field, meta] = useField(props);

  return (
    <div className={`form-group mb-3 mb-md-2 col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      {inputType === 'long'
        ? longTextInput(isRequired, field, props)
        : shortTextInput(isRequired, field, props)}
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default TextInput;
