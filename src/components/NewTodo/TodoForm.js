import React from 'react';

import Input from '../UI/Input';

import useInput from '../../hooks/use-input';

import classes from './TodoForm.module.css';

const validateEmptyValue = val => {
  return val.trim().length > 0;
};

const getInvalidClass = errorState => {
  return errorState ? 'invalid' : '';
};

const TodoForm = props => {
  const textInput = useInput(validateEmptyValue);
  const categoryInput = useInput(validateEmptyValue);
  const dateInput = useInput(validateEmptyValue);

  const textInvalidClass = getInvalidClass(textInput.todoInputHasError);
  const categoryInvalidClass = getInvalidClass(categoryInput.todoInputHasError);
  const dateInvalidClass = getInvalidClass(dateInput.todoInputHasError);

  const formIsValid =
    textInput.todoInputIsValid &&
    categoryInput.todoInputIsValid &&
    dateInput.todoInputIsValid;

  // Get minimum date for todo.
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const minDate = `${year}-${month}-${day}`;

  const todoFormSubmitHandler = e => {
    e.preventDefault();

    textInput.todoInputBlurHandler(e);
    categoryInput.todoInputBlurHandler(e);
    dateInput.todoInputBlurHandler(e);

    if (!formIsValid) return;

    props.onTodoSubmit({
      todoText: textInput.todoInput,
      todoCategory: categoryInput.todoInput,
      todoDate: dateInput.todoInput,
    });

    textInput.resetInput();
    categoryInput.resetInput();
    dateInput.resetInput();
  };

  return (
    <form onSubmit={todoFormSubmitHandler} className={classes['form']}>
      <div className={classes['form-group']}>
        <div
          className={`${classes['form-control']} ${classes[textInvalidClass]}`}
        >
          <label htmlFor="todoText">Task Name: </label>
          <Input
            value={textInput.todoInput}
            onChange={textInput.todoInputChangeHandler}
            onBlur={textInput.todoInputBlurHandler}
            id="todoText"
            type="text"
            placeholder="Enter task name"
          />
          {textInput.todoInputHasError && (
            <p className="error-msg">Task name can not be empty.</p>
          )}
        </div>
        <div
          className={`${classes['form-control']} ${classes[categoryInvalidClass]}`}
        >
          <label htmlFor="todoCategory">Task Category: </label>
          <Input
            value={categoryInput.todoInput}
            onChange={categoryInput.todoInputChangeHandler}
            onBlur={categoryInput.todoInputBlurHandler}
            id="todoCategory"
            type="text"
            placeholder="Enter task category"
          />
          {categoryInput.todoInputHasError && (
            <p className="error-msg">Task category can not be empty.</p>
          )}
        </div>
        <div
          className={`${classes['form-control']} ${classes[dateInvalidClass]}`}
        >
          <label htmlFor="todoDate">Task Date: </label>
          <Input
            value={dateInput.todoInput}
            onChange={dateInput.todoInputChangeHandler}
            onBlur={dateInput.todoInputBlurHandler}
            id="todoDate"
            type="date"
            placeholder="Enter task date"
            min={minDate}
          />
          {dateInput.todoInputHasError && (
            <p className="error-msg">Task date can not be empty.</p>
          )}
        </div>
      </div>
      <div className={classes['form-action']}>
        <button type="submit" className={classes['btn--submit']}>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
