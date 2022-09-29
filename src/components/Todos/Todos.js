import React from 'react';

import TodoItem from './TodoItem';

import classes from './Todos.module.css';

const Todos = props => {
  let content;

  if (props.todoData.length > 0) {
    content = props.todoData.map(data => {
      return (
        <TodoItem
          onClick={props.onTaskComplete.bind(null, data.id)}
          key={data.id}
          data={data}
        />
      );
    });
  } else {
    content = (
      <p className={classes['user-msg']}>😊 Please start adding tasks.</p>
    );
  }

  return <ul className={classes['todo-list']}>{content}</ul>;
};

export default Todos;
