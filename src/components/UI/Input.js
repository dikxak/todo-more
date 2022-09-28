import React from 'react';

const Input = props => {
  return (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.inputObj.todoInputChangeHandler}
      onBlur={props.inputObj.todoInputBlurHandler}
      value={props.inputObj.todoInput}
      min={props.min ? props.min : null}
    />
  );
};

export default Input;
