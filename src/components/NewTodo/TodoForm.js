import React from 'react';

import { Formik, Form, Field } from 'formik';

const TodoForm = props => {
  const validate = (values, props) => {
    const errors = {};

    if (!values.todoText) {
      errors.todoText = 'Task name is required.';
    }
    if (!values.todoCategory) {
      errors.todoCategory = 'Task category is required.';
    }
    if (!values.todoDate) {
      errors.todoDate = 'Task date is required.';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        todoText: '',
        todoCategory: '',
        todoDate: '',
      }}
      onSubmit={values => {
        props.onTodoSubmit(values);
      }}
      validate={validate}
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="todoText">Task Name:</label>
          <Field id="todoText" name="todoText" placeholder="Enter task name" />
          {errors.todoText && touched.todoText && <p>{errors.todoText}</p>}

          <label htmlFor="todoCategory">Task Category:</label>
          <Field
            id="todoCategory"
            name="todoCategory"
            placeholder="Enter task category"
          />
          {errors.todoCategory && touched.todoCategory && (
            <p>{errors.todoCategory}</p>
          )}

          <label htmlFor="todoDate">Enter Date:</label>
          <Field id="todoDate" name="todoDate" type="date" />
          {errors.todoDate && touched.todoDate && <p>{errors.todoDate}</p>}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
