import { useField } from 'formik';
import AddressSearch from './AddressSearch';

const AddressInput = ({ label, isRequired = true, colWidth = '13', ...props }) => {
  const [field, meta, helpers] = useField(props);

  if (isRequired && props.placeholder) {
    props.placeholder += '*';
  }

  return (
    <div className={`form-group mb-3 mb-md-2 col-${colWidth}`}>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label || props.placeholder || props.name}
      </label>
      <AddressSearch
        updateFun={helpers.setValue}
        className="text-input form-control"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default AddressInput;
