import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliarity/Auxiliarity';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

  ingredientSummary = (ingredients) => {
    const ingredientSummary = []
    for (let ingKey in ingredients) {
        ingredientSummary.push(
          <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}
            : {ingredients[ingKey]}</span>
          </li>
        )
    }
    return ingredientSummary;
  }

  // This could be a functional components, doesn't have to be a class
  componentWillUpdate() {
    console.log('[OrderSummary] will update');
  }

  render () {
    const {ingredients,
           cancelPurchasing,
           continuePurchasing,
           totalPrice} = this.props;
  
    return (
      <Aux>
        <h3>Your Order</h3>
        <p> A delicious burger with the following ingredients:</p>
        <ul>
          {this.ingredientSummary(ingredients)}
        </ul>
        <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={cancelPurchasing} btnType="Danger">CANCEL</Button>
        <Button clicked={continuePurchasing} btnType="Success">CONTINUE</Button>
      </Aux>
    );
  }
  
};

export default OrderSummary; 