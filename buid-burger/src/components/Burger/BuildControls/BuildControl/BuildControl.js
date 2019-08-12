import React from 'react';
import classes from './BuildControl.css';

const buildControl = ({label, added, removed, disabled, totalIngredient}) => ( 
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{totalIngredient} - {label}</div>
    <button 
      className={classes.Less}
      onClick={removed}
      disabled={disabled}>
      Less
    </button>
    <button 
      className={classes.More} 
      onClick={added}>
      More
    </button>
  </div>
)

export default buildControl;