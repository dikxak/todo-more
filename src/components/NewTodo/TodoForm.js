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

const getMinimumDate = () => {
  // Get minimum date for todo.
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  return `${year}-${month}-${day}`;
};

const TodoForm = props => {
  const textInput = useInput(validateEmptyValue, {
    type: 'text',
    id: 'todoText',
    placeholder: 'Enter task name',
    label: 'Task Name:',
  });
  const categoryInput = useInput(validateEmptyValue, {
    type: 'text',
    id: 'todoCategory',
    placeholder: 'Enter task category',
    label: 'Task Category:',
  });
  const dateInput = useInput(validateEmptyValue, {
    type: 'date',
    id: 'todoDate',
    placeholder: 'Enter task date',
    min: getMinimumDate(),
    label: 'Task Date:',
  });

  const textInvalidClass = getInvalidClass(textInput.todoInputHasError);
  const categoryInvalidClass = getInvalidClass(categoryInput.todoInputHasError);
  const dateInvalidClass = getInvalidClass(dateInput.todoInputHasError);

  const inputs = [textInput, categoryInput, dateInput];
  const todoKeys = ['todoText', 'todoCategory', 'todoDate'];

  const formIsValid = inputs.every(input => input.todoInputIsValid);

  const todoFormSubmitHandler = e => {
    let todoValue = {};

    e.preventDefault();

    inputs.forEach(input => input.todoInputBlurHandler());

    if (!formIsValid) return;

    inputs.forEach((input, i) => {
      todoValue[todoKeys[i]] = input.todoInput;
    });
    todoValue.isCompleted = false;

    props.onTodoSubmit(todoValue);

    inputs.forEach(input => input.resetInput());
  };

  return (
    <form onSubmit={todoFormSubmitHandler} className={classes['form']}>
      <div className={classes['form-group']}>
        <Input invalidClass={textInvalidClass} inputObj={textInput} />

        <Input invalidClass={categoryInvalidClass} inputObj={categoryInput} />

        <Input invalidClass={dateInvalidClass} inputObj={dateInput} />
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
