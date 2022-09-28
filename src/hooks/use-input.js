import { useState } from 'react';

const useInput = validateInput => {
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

  const resetInput = () => {
    setTodoInput('');
    setTodoInputIsTouched(false);
  };

  return {
    todoInput,
    todoInputIsValid,
    todoInputHasError,
    todoInputChangeHandler,
    todoInputBlurHandler,
    resetInput,
  };
};

export default useInput;
