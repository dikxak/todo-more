import React from 'react';

import { MdCancel } from 'react-icons/md';

import classes from './TodoItem.module.css';

const TodoItem = props => {
  let remainingText;

  if (props.remainingDays === 0) {
    remainingText = 'Today';
  } else if (props.remainingDays === 1) {
    remainingText = `${props.remainingDays} day remaining`;
  } else {
    remainingText = `${props.remainingDays} days remaining`;
  }

  return (
    <li className={classes['todo-item']}>
      <span className={classes['todo-category']}>{props.category}</span>

      <div className={classes['todo-info']}>
        <p className={classes['todo-text']}>{props.text}</p>
        <p className={classes['todo-date']}>{remainingText}</p>
      </div>

      <button title="Completed task" className={classes['btn-todo']}>
        <MdCancel />
      </button>
    </li>
  );
};

export default TodoItem;
