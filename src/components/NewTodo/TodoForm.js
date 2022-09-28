import React from 'react';

import classes from './TodoForm.module.css';

const TodoForm = props => {
  return (
    <form className={classes['form']}>
      <div className={classes['form-group']}>
        <div className={classes['form-control']}>
          <label htmlFor="todoText">Task Name: </label>
          <input id="todoText" type="text" placeholder="Enter task name" />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor="todoCategory">Task Category: </label>
          <input
            id="todoCategory"
            type="text"
            placeholder="Enter task category"
          />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor="todoDate">Task Date: </label>
          <input id="todoDate" type="date" placeholder="Enter task date" />
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
