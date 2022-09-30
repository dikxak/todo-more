import React from 'react';

import { Formik, Form, Field } from 'formik';

import classes from './TodoForm.module.css';

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

const TodoForm = props => {
  const inputAttributes = {
    todoText: {
      type: 'text',
      label: 'Task Name:',
      placeholder: 'Enter task name',
    },

    todoCategory: {
      type: 'text',
      label: 'Task Category:',
      placeholder: 'Enter task category',
    },

    todoDate: {
      type: 'date',
      label: 'Task Date:',
      placeholder: 'Enter task date',
      min: getMinimumDate(),
    },

    todoPriority: {
      type: 'select',
      label: 'Task Priority',
      placeholder: 'Select task priority',
    },
  };

  const priorityList = [
    'Select Priority',
    'top',
    'very high',
    'high',
    'medium',
    'low',
  ];

  const validate = (values, props) => {
    const errors = {};

    Object.keys(inputAttributes).forEach(key => {
      const inputObj = inputAttributes[key];

      if (!values[key])
        errors[key] = `${inputObj.label.replace(':', '')} is required.`;
    });

    return errors;
  };

  return (
    <Formik
      initialValues={{
        todoText: '',
        todoCategory: '',
        todoDate: '',
        todoPriority: '',
      }}
      onSubmit={(values, { resetForm }) => {
        props.onTodoSubmit(values);
        resetForm();
      }}
      validate={validate}
    >
      {({ errors, touched }) => (
        <Form className={classes['form']}>
          <div className={classes['form-group']}>
            {Object.keys(inputAttributes).map((key, i) => {
              const inputObj = inputAttributes[key];

              return (
                <div
                  key={key}
                  className={`${classes['form-control']} ${
                    classes[errors[key] && touched[key] && 'invalid']
                  }`}
                >
                  <label htmlFor={key}>{inputObj.label}</label>
                  {i === Object.keys(inputAttributes).length - 1 ? (
                    <Field as={inputObj.type} name={key} id={key}>
                      {priorityList.map((priority, i) => {
                        return (
                          <option
                            disabled={i === 0}
                            key={priority}
                            value={i === 0 ? '' : priority}
                          >
                            {getCapitalizedString(priority)}
                          </option>
                        );
                      })}
                    </Field>
                  ) : (
                    <Field
                      type={inputObj.type}
                      id={key}
                      name={key}
                      placeholder={inputObj.placeholder}
                      min={inputObj.min && inputObj.min}
                    />
                  )}
                  {errors[key] && touched[key] && (
                    <p className="error-msg">{errors[key]}</p>
                  )}
                </div>
              );
            })}
          </div>
          <div className={classes['form-action']}>
            <button className={classes['btn--submit']} type="submit">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
