import { useField } from 'formik';

const RadioOptions = (groupName, isRequired, inline, onSelect, options) => {
  let allOptions = [];
  const groupClass = inline ? 'form-check form-check-inline' : 'form-check';

  options.forEach((option) => {
    allOptions.push(
      <div className={groupClass} key={`topDiv-${option}`}>
        <input
          key={`input-${option}`}
          required={isRequired}
          name={groupName}
          className="form-check-input"
          type="radio"
          value={option}
          onClick={() => onSelect(option)}
        />
        <label className="form-check-label" htmlFor={groupName + option} key={`label-${option}`}>
          {option}
        </label>
      </div>,
    );
  });

  return allOptions;
};

const RadioInput = ({
  label,
  isRequired = true,
  inline = true,
  colWidth = '13',
  options = ['Yes', 'No'],
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className={`form-group mb-3 mb-md-2 text-left col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.name}>
        {label || props.placeholder || props.name}
      </label>

      <label className="form-check-label mr-2">{props.children}</label>
      {RadioOptions(props.name, isRequired, inline, helpers.setValue, options)}
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default RadioInput;
