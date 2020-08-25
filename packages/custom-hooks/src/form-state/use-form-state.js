import { useState } from "react";

const validator = {
  required: (value) => !!value,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  number: (value) => !isNaN(Number(value)),
  min: (value, min) => value.length >= min,
  max: (value, max) => value.length <= max,
  regexp: (value, regexp) => regexp.test(value),
};

const errors = {
  required: (name) => `${name} is a required field`,
  email: (name) => `${name} must be a valid email address`,
  number: (name) => `${name} must be a valid number`,
  min: (name, val) =>
    `${name} must be at least ${val} characters long`,
  max: (name, val) =>
    `${name} cannot be more than ${val} characters long`,
  regexp: (name) => `${name} is invalid`,
};

// initialState must have value & error properties
const useFormState = (
  initialState,
  validationRules = {},
  callback = (values) => {},
) => {
  const [state, setState] = useState(initialState);

  const checkErrors = (name, value) => {
    const rules = Object.keys(validationRules[name]);
    let error = "";

    rules.forEach((rule) => {
      if (!validator[rule](value, validationRules[name][rule])) {
        error = errors[rule](name, validationRules[name][rule]);
      }
    });

    return error;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const error = checkErrors(name, value);

    setState({
      ...state,
      [name]: { value, error },
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const fields = Object.keys(state);
    let error;
    let obj = {};

    fields.forEach((field) => {
      error = checkErrors(field, event.target.elements[field].value);

      obj = Object.assign(obj, {
        [field]: {
          value: event.target.elements[field].value || "",
          error,
        },
      });
    });

    setState(obj);

    // If no errors found in form values, use
    // submit callback with form field values
    if (!fields.find((field) => obj[field].error)) {
      const values = Object.keys(obj).reduce((acc, key) => {
        acc[key] = obj[key].value;
        return acc;
      }, {});
      callback(values);
    }
  };

  return [state, handleOnChange, handleOnSubmit];
};

export default useFormState;
