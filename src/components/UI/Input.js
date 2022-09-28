import React from 'react';

const Input = props => {
  return (
    <React.Fragment>
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
        <p className="error-msg">Task date can not be empty.</p>
      )}
    </React.Fragment>
  );
};

export default Input;
