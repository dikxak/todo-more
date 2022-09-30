import React from 'react';

import { MdCancel } from 'react-icons/md';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

import classes from './TodoItem.module.css';

const TodoItem = props => {
  let remainingText;

  if (props.data.todoRemainingDay === 0) {
    remainingText = 'Today';
  } else if (props.data.todoRemainingDay === 1) {
    remainingText = `${props.data.todoRemainingDay} day remaining`;
  } else {
    remainingText = `${props.data.todoRemainingDay} days remaining`;
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
          onClick={props.onEdit}
          title="Edit task"
          className={`${classes['btn-todo']} ${classes['btn-todo-edit']}`}
        >
          <FaEdit />
        </button>

        <button
          onClick={props.onComplete}
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
