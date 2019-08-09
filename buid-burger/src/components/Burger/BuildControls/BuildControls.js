import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({ingredientAdded, 
                        ingredientRemoved,
                        disabledInfo,
                        price,
                        purchaseable,
                        ordered}) => {
                          
  const showControls = controls.map( ctrl => (
    <BuildControl 
      key={ctrl.label}
      label={ctrl.label}
      added={() => ingredientAdded(ctrl.type)}
      removed={() => ingredientRemoved(ctrl.type)} 
      disabled={disabledInfo[ctrl.type]} 
    />
  ))

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
      {showControls}    
      <button 
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
}

export default buildControls;