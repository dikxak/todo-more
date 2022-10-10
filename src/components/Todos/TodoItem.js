import React from 'react';

import { MdCancel } from 'react-icons/md';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

import classes from './TodoItem.module.css';

const getRemainingDays = date => {
  const date1 = new Date(date);
  const date2 = new Date();

  const dateDifference = date1.getTime() - date2.getTime();
  const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));

  return dayDifference;
};

const TodoItem = props => {
  const remainingDays = getRemainingDays(props.data.todoDate);
  let remainingText;

  if (remainingDays === 0) {
    remainingText = 'Today';
  } else if (remainingDays === 1) {
    remainingText = `${remainingDays} day remaining`;
  } else {
    remainingText = `${remainingDays} days remaining`;
  }

  return (
    <li
      className={`${classes['todo-item']} ${
        classes[props.data.isCompleted ? 'todo-complete' : '']
      } ${classes[props.data.todoPriority.replace(' ', '-')]}`}
    >
      <span className={classes['todo-category']}>
        {props.data.todoCategory}
      </span>

      <div className={classes['todo-info']}>
        <p className={classes['todo-text']}>{props.data.todoText}</p>
        <p className={classes['todo-date']}>{remainingText}</p>
      </div>

      <div className={classes['todo-control-group']}>
        <button
          onClick={props.onEdit.bind(null, props.data.id)}
          title="Edit task"
          className={`${classes['btn-todo']} ${classes['btn-todo-edit']}`}
        >
          <FaEdit />
        </button>

        <button
          onClick={props.onComplete.bind(null, props.data.id)}
          title="Complete task"
          className={`${classes['btn-todo']} ${classes['btn-todo-complete']}`}
        >
          {props.data.isCompleted ? <FaCheckCircle /> : <MdCancel />}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
