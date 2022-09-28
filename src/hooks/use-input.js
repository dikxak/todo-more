import { useState } from 'react';

const useHttp = validateInput => {
  const [todoInput, setTodoInput] = useState('');
  const [todoInputIsTouched, setTodoInputIsTouched] = useState(false);

  const todoInputIsValid = validateInput(todoInput);
  const todoInputHasError = todoInputIsTouched && !todoInputIsValid;

  const todoInputChangeHandler = e => {
    setTodoInput(e.target.value);
    setTodoInputIsTouched(true);
  };

  const todoInputBlurHandler = e => {
    setTodoInputIsTouched(true);
  };

  return {
    todoInput,
    todoInputIsValid,
    todoInputHasError,
    todoInputChangeHandler,
    todoInputBlurHandler,
  };
};

export default useHttp;
