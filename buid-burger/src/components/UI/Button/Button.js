import React from 'react';
import classes from './Button.css';

const button = ({clicked, btnType, children, disabled}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    disabled={disabled}>
    {children}
  </button>
);

export default button;