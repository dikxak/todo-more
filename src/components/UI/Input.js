import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  return (
    <div
      className={`${classes['form-control']} ${classes[props.invalidClass]}`}
    >
      <label htmlFor={props.inputObj.inputAttributes.id}>
        {props.inputObj.inputAttributes.label}
      </label>
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
      {props.inputObj.todoInputHasError && (
        <p className="error-msg">
          {props.inputObj.inputAttributes.label.replace(':', '')} can not be
          empty.
        </p>
      )}{' '}
    </div>
  );
};

export default Input;
