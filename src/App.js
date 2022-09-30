import React, { useState } from 'react';
import Container from './components/UI/Container';
import TodoForm from './components/NewTodo/TodoForm';
import Todos from './components/Todos/Todos';

const App = () => {
  const [todoId, setTodoId] = useState(1);
  const [todoData, setTodoData] = useState([]);
  const [updateTodoData, setUpdateTodoData] = useState();

  const todoDataAddHandler = todoData => {
    const data = { id: `t${todoId}`, ...todoData };

    setTodoData(prevTasks => [...prevTasks, data]);
    setTodoId(prevId => ++prevId);
  };

  const handleTaskCompletion = taskId => {
    const taskObj = todoData.find(data => data.id === taskId);
    taskObj.isCompleted = true;

    setTodoData(prevTasks => [...prevTasks]);
  };

  const handleTaskEdit = taskId => {
    const updateData = todoData.find(data => data.id === taskId);

    setUpdateTodoData(updateData);
  };

  const todoDataEditHandler = editData => {
    let editedData = todoData.find(data => data.id === editData.id);

    Object.keys(editData).forEach(key => {
      editedData[key] = editData[key];
    });

    // set to null - after update is done, form is reset.
    setUpdateTodoData(null);
    setTodoData(prevData => [...prevData]);
  };

  return (
    <Container>
      <h1 className="primary-heading">Todo More</h1>
      <TodoForm
        todoEditData={updateTodoData}
        onTodoEdit={todoDataEditHandler}
        onTodoAdd={todoDataAddHandler}
      />
      <Todos
        onTaskEdit={handleTaskEdit}
        onTaskComplete={handleTaskCompletion}
        todoData={todoData}
      />
    </Container>
  );
};

export default App;
