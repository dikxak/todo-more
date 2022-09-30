import React from 'react';

import { Formik, Form, Field } from 'formik';

import classes from './TodoForm.module.css';

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
    },
  };

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
            {Object.keys(inputAttributes).map(key => {
              const inputObj = inputAttributes[key];

              return (
                <div
                  key={key}
                  className={`${classes['form-control']} ${
                    classes[errors[key] && touched[key] && 'invalid']
                  }`}
                >
                  <label htmlFor={key}>{inputObj.label}</label>
                  <Field
                    type={inputObj.type}
                    id={key}
                    name={key}
                    placeholder={inputObj.placeholder}
                  />
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
