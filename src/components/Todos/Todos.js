import React from 'react';

import TodoItem from './TodoItem';

import classes from './Todos.module.css';

const Todos = props => {
  return (
    <ul className={classes['todo-list']}>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  );
};

export default Todos;
