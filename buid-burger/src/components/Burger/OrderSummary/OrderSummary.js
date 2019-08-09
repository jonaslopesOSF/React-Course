import React from 'react';
import Aux from '../../../hoc/Auxiliarity';
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, cancelPurchasing}) => {
  const ingredientSummary = []
  for (let ingKey in ingredients) {
      ingredientSummary.push(
        <li key={ingKey}>
          <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
          : {ingredients[ingKey]}
        </li>
      )
  }

  return (
    <Aux>
      <h3>Your Order</h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button clicked={cancelPurchasing} btnType="Danger">CANCEL</Button>
      <Button btnType="Success">CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary; 