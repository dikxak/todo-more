import React from 'react';

import useHttp from '../../hooks/use-input';

import classes from './TodoForm.module.css';

const TodoForm = props => {
  const {
    todoInput: todoText,
    todoInputChangeHandler: todoTextChangeHandler,
    todoInputBlurHandler: todoTextBlurHandler,
    todoInputHasError: todoTextHasError,
    todoInputIsValid: todoTextIsValid,
    resetInput: resetTodoText,
  } = useHttp(value => value.trim().length > 0);

  const {
    todoInput: todoCategory,
    todoInputChangeHandler: todoCategoryChangeHandler,
    todoInputBlurHandler: todoCategoryBlurHandler,
    todoInputHasError: todoCategoryHasError,
    todoInputIsValid: todoCategoryIsValid,
    resetInput: resetTodoCategory,
  } = useHttp(value => value.trim().length > 0);

  const {
    todoInput: todoDate,
    todoInputChangeHandler: todoDateChangeHandler,
    todoInputBlurHandler: todoDateBlurHandler,
    todoInputHasError: todoDateHasError,
    todoInputIsValid: todoDateIsValid,
    resetInput: resetTodoDate,
  } = useHttp(value => value.trim().length > 0);

  const textInvalidClass = todoTextHasError ? 'invalid' : '';
  const categoryInvalidClass = todoCategoryHasError ? 'invalid' : '';
  const dateInvalidClass = todoDateHasError ? 'invalid' : '';

  const formIsValid = todoTextIsValid && todoCategoryIsValid && todoDateIsValid;

  // Get min date for todo.
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const minDate = `${year}-${month}-${day}`;

  const todoFormSubmitHandler = e => {
    e.preventDefault();

    todoTextBlurHandler(e);
    todoCategoryBlurHandler(e);
    todoDateBlurHandler(e);

    if (!formIsValid) return;

    props.onTodoSubmit({ todoText, todoCategory, todoDate });

    resetTodoText();
    resetTodoCategory();
    resetTodoDate();
  };

  return (
    <form onSubmit={todoFormSubmitHandler} className={classes['form']}>
      <div className={classes['form-group']}>
        <div
          className={`${classes['form-control']} ${classes[textInvalidClass]}`}
        >
          <label htmlFor="todoText">Task Name: </label>
          <input
            value={todoText}
            onChange={todoTextChangeHandler}
            onBlur={todoTextBlurHandler}
            id="todoText"
            type="text"
            placeholder="Enter task name"
          />
          {todoTextHasError && (
            <p className="error-msg">Task name can not be empty.</p>
          )}
        </div>
        <div
          className={`${classes['form-control']} ${classes[categoryInvalidClass]}`}
        >
          <label htmlFor="todoCategory">Task Category: </label>
          <input
            value={todoCategory}
            onChange={todoCategoryChangeHandler}
            onBlur={todoCategoryBlurHandler}
            id="todoCategory"
            type="text"
            placeholder="Enter task category"
          />
          {todoCategoryHasError && (
            <p className="error-msg">Task category can not be empty.</p>
          )}
        </div>
        <div
          className={`${classes['form-control']} ${classes[dateInvalidClass]}`}
        >
          <label htmlFor="todoDate">Task Date: </label>
          <input
            value={todoDate}
            onChange={todoDateChangeHandler}
            onBlur={todoDateBlurHandler}
            id="todoDate"
            type="date"
            placeholder="Enter task date"
            min={minDate}
          />
          {todoDateHasError && (
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
