import React from 'react';

const Input = props => {
  return (
    <input
      id={props.inputObj.inputAttributes.id}
      type={props.inputObj.inputAttributes.type}
      placeholder={props.inputObj.inputAttributes.placeholder}
      onChange={props.inputObj.todoInputChangeHandler}
      onBlur={props.inputObj.todoInputBlurHandler}
      value={props.inputObj.todoInput}
      min={
        props.inputObj.inputAttributes.min
          ? props.inputObj.inputAttributes.min
          : null
      }
    />
  );
};

export default Input;
