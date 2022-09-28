import React from 'react';

const Input = props => {
  return (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      min={props.min ? props.min : null}
    />
  );
};

export default Input;
