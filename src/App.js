import React, { useState } from 'react';
import Container from './components/UI/Container';
import TodoForm from './components/NewTodo/TodoForm';
import Todos from './components/Todos/Todos';

const getRemainingDays = date => {
  const date1 = new Date(date);
  const date2 = new Date();

  const dateDifference = date1.getTime() - date2.getTime();
  const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));

  return dayDifference;
};

const App = () => {
  const [todoId, setTodoId] = useState(1);
  const [todoData, setTodoData] = useState([]);

  const todoDataAddHandler = todoData => {
    const dayRemaining = getRemainingDays(todoData.todoDate);

    const todo = {
      id: `t${todoId}`,
      taskText: todoData.todoText,
      taskCategory: todoData.todoCategory,
      taskRemainingDay: dayRemaining,
      taskPriority: todoData.todoPriority,
    };

    setTodoData(prevTasks => [...prevTasks, todo]);
    setTodoId(prevId => ++prevId);
  };

  const handleTaskCompletion = taskId => {
    const taskObj = todoData.find(data => data.id === taskId);
    taskObj.isCompleted = true;

    setTodoData(prevTasks => [...prevTasks]);
  };

  return (
    <Container>
      <h1 className="primary-heading">Todo More</h1>
      <TodoForm onTodoSubmit={todoDataAddHandler} />
      <Todos onTaskComplete={handleTaskCompletion} todoData={todoData} />
    </Container>
  );
};

export default App;
