import React from 'react';
import './form-input.styles.scss';
function FormInput({ handleChange, label, ...otherProps }) {
  return (
    <div className="group">
      {label ? (
        <label className={`${otherProps.value.length ? 'shrink' : ''} " form-input-label`}>{label}</label>
      ) : null}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default FormInput;
