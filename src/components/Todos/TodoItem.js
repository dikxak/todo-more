import React from 'react';

import { MdCancel } from 'react-icons/md';

import classes from './TodoItem.module.css';

const TodoItem = props => {
  return (
    <li className={classes['todo-item']}>
      <span className={classes['todo-category']}>Daily</span>

      <div className={classes['todo-info']}>
        <p className={classes['todo-text']}>
          Buy 1kg sugar from department store.
        </p>
        <p className={classes['todo-date']}>2 days remaining</p>
      </div>

      <button title="Completed task" className={classes['btn-todo']}>
        <MdCancel />
      </button>
    </li>
  );
};

export default TodoItem;
