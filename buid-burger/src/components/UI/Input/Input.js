import React from "react";
import classes from "./Input.css";

const input = ({ elementType,
                 elementConfig,
                 value,
                 label,
                 changed,
                 invalid,
                 shouldValidate,
                 touched,
                 errorMessage }) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement]

  let validationError = null;
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>{errorMessage}</p>;
}

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "output":
      inputElement = (
        <output
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
