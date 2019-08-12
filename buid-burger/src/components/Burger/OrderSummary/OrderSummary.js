import React from 'react';
import Aux from '../../../hoc/Auxiliarity';
import Button from '../../UI/Button/Button';


const orderSummary = ({ingredients,
                       cancelPurchasing,
                       continuePurchasing,
                       totalPrice}) => {

  const ingredientSummary = []
  for (let ingKey in ingredients) {
      ingredientSummary.push(
        <li key={ingKey}>
          <span style={{textTransform: 'capitalize'}}>{ingKey}
          : {ingredients[ingKey]}</span>
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
      <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button clicked={cancelPurchasing} btnType="Danger">CANCEL</Button>
      <Button clicked={continuePurchasing} btnType="Success">CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary; 