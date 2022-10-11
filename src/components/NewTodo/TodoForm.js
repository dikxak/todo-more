import React, { useState } from 'react';

import classes from './TodoForm.module.css';

import formSchema from '../../json/todoJson.json';

const getMinimumDate = () => {
  // Get minimum date for todo.
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: '2-digit' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });

  return `${year}-${month}-${day}`;
};

const getCapitalizedString = str => {
  let capitalizedStr = '',
    spaceIndex = 0;

  str.split('').forEach((s, i) => {
    if (i === 0) capitalizedStr += s.toUpperCase();
    else if (s === ' ') {
      spaceIndex = i + 1;
      capitalizedStr += s;
    } else if (i === spaceIndex) {
      capitalizedStr += s.toUpperCase();
    } else {
      capitalizedStr += s;
    }
  });
  return capitalizedStr;
};

const initialValue = {};
const initialError = {};

formSchema.elements.forEach(el => {
  initialValue[Object.keys(el)[0]] = initialError[Object.keys(el)[0]] = '';
});

const TodoForm = props => {
  const [inputValues, setInputValues] = useState(
    props.todoEditData ? props.todoEditData : initialValue
  );
  const [inputErrors, setInputErrors] = useState(initialError);

  const inputChangeHandler = (elemInfo, e) => {
    const key = Object.keys(elemInfo)[0];
    const elObj = elemInfo[key];

    validate(key, e.target.value, elObj.label);

    setInputValues(prevValues => {
      return { ...prevValues, [key]: e.target.value };
    });
  };

  const inputBlurHandler = (elemInfo, e) => {
    const key = Object.keys(elemInfo)[0];
    const elObj = elemInfo[key];

    validate(key, e.target.value, elObj.label);
  };

  const validate = (key, value, label) => {
    if (!value)
      setInputErrors(prevErrors => {
        return { ...prevErrors, [key]: `${label} cannot be empty.` };
      });
    else
      setInputErrors(prevErrors => {
        return { ...prevErrors, [key]: '' };
      });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    let returnFlag = false;

    Object.keys(inputValues).forEach((key, i) => {
      const value = inputValues[key];
      const label = formSchema.elements[i][key].label;

      validate(key, value, label);
    });

    Object.keys(inputErrors).forEach(key => {
      if (inputErrors[key]) {
        returnFlag = true;
        return;
      }
    });

    if (returnFlag) return;

    console.log(inputValues);
    console.log(inputErrors);
    // console.log('returned');
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes['form']}>
      <div className={classes['form-group']}>
        {formSchema.elements.map(el => {
          const key = Object.keys(el)[0];
          const elObj = el[key];

          return (
            <div key={key} className={classes['form-control']}>
              <label htmlFor={key}>{elObj.label}</label>
              {elObj.type === 'select' ? (
                <select
                  onChange={inputChangeHandler.bind(null, el)}
                  onBlur={inputBlurHandler.bind(null, el)}
                  defaultValue=""
                  name={key}
                  id={key}
                >
                  {elObj.options.map((opt, i) => {
                    return (
                      <option
                        disabled={i === 0}
                        key={opt}
                        value={i === 0 ? '' : opt}
                      >
                        {getCapitalizedString(opt)}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  id={key}
                  onChange={inputChangeHandler.bind(null, el)}
                  onBlur={inputBlurHandler.bind(null, el)}
                  type={elObj.type}
                  min={
                    elObj.min
                      ? elObj.min
                      : elObj.type === 'date'
                      ? getMinimumDate()
                      : null
                  }
                  placeholder={elObj.placeholder}
                />
              )}
              {inputErrors[key] && (
                <p className="error-msg">{inputErrors[key]}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className={classes['form-action']}>
        <button type="submit" className={classes['btn--submit']}>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
