import React from 'react';

import { MdCancel } from 'react-icons/md';

import classes from './TodoItem.module.css';

const TodoItem = props => {
  let remainingText;

  if (props.data.taskRemainingDay === 0) {
    remainingText = 'Today';
  } else if (props.data.taskRemainingDay === 1) {
    remainingText = `${props.data.taskRemainingDay} day remaining`;
  } else {
    remainingText = `${props.data.taskRemainingDay} days remaining`;
  }

  return (
    <li className={classes['todo-item']}>
      <span className={classes['todo-category']}>
        {props.data.taskCategory}
      </span>

      <div className={classes['todo-info']}>
        <p className={classes['todo-text']}>{props.data.taskText}</p>
        <p className={classes['todo-date']}>{remainingText}</p>
      </div>

      <button title="Completed task" className={classes['btn-todo']}>
        <MdCancel />
      </button>
    </li>
  );
};

export default TodoItem;
