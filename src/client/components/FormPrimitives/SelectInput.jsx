import { useField } from 'formik';
import Select from 'react-select';

const customStyles = {
  control: (styles) => ({
    ...styles,
    border: 'none',
    margin: '-.3rem 0 0 0',
    boxShadow: 'none',
  }),
  multiValue: (styles) => ({
    ...styles,
    fontSize: '1.1rem',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    '&:hover': { color: '#404040', backgroundColor: '#D3D3D3' },
  }),
  menu: (styles) => ({
    ...styles,
    marginLeft: '-0.7rem',
  }),
};
const noop = () => {
  // no operation (do nothing real quick)
};

const SelectInput = ({ label, isRequired = true, colWidth = '13', ...props }) => {
  const [field, meta, helpers] = useField(props);

  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }

  return (
    <div className={`form-group mb-3 mb-md-2 col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>

      <Select
        isMulti
        styles={customStyles}
        defaultValue={[]}
        name={props.name}
        instanceId={props.name}
        options={props.options}
        placeholder={props.placeholder}
        className="basic-multi-select form-control"
        classNamePrefix="select"
        onChange={(selectedOptions) =>
          helpers.setValue((selectedOptions || []).map((option) => option.value))
        }
      />
      {isRequired && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            opacity: 0,
            height: 0,
            position: 'absolute',
          }}
          value={field.value}
          onChange={noop}
          required
        />
      )}

      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default SelectInput;
