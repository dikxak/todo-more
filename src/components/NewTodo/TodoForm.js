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
  // Get minimum date for todo.
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const minDate = `${year}-${month}-${day}`;

  const textInput = useInput(validateEmptyValue, {
    type: 'text',
    id: 'todoText',
    placeholder: 'Enter task name',
  });
  const categoryInput = useInput(validateEmptyValue, {
    type: 'text',
    id: 'todoCategory',
    placeholder: 'Enter task category',
  });
  const dateInput = useInput(validateEmptyValue, {
    type: 'date',
    id: 'todoDate',
    placeholder: 'Enter task date',
    min: minDate,
  });

  const textInvalidClass = getInvalidClass(textInput.todoInputHasError);
  const categoryInvalidClass = getInvalidClass(categoryInput.todoInputHasError);
  const dateInvalidClass = getInvalidClass(dateInput.todoInputHasError);

  const inputs = [textInput, categoryInput, dateInput];

  const formIsValid = inputs.every(input => input.todoInputIsValid);

  const todoFormSubmitHandler = e => {
    e.preventDefault();

    inputs.forEach(input => input.todoInputBlurHandler());

    if (!formIsValid) return;

    props.onTodoSubmit({
      todoText: textInput.todoInput,
      todoCategory: categoryInput.todoInput,
      todoDate: dateInput.todoInput,
    });

    inputs.forEach(input => input.resetInput());
  };

  return (
    <form onSubmit={todoFormSubmitHandler} className={classes['form']}>
      <div className={classes['form-group']}>
        <div
          className={`${classes['form-control']} ${classes[textInvalidClass]}`}
        >
          <label htmlFor="todoText">Task Name: </label>
          <Input inputObj={textInput} />
        </div>
        <div
          className={`${classes['form-control']} ${classes[categoryInvalidClass]}`}
        >
          <label htmlFor="todoCategory">Task Category: </label>
          <Input inputObj={categoryInput} />
        </div>
        <div
          className={`${classes['form-control']} ${classes[dateInvalidClass]}`}
        >
          <label htmlFor="todoDate">Task Date: </label>
          <Input inputObj={dateInput} />
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
