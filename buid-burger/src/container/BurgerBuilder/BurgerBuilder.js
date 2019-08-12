import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliarity';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.0,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2,
    purchaseable: false,
    purchasing: false,
  }

  updatePurchaseState = (ingredients) => {
    let count = 0
    for (let key in ingredients){
      count += ingredients[key]
    }
    this.setState({ purchaseable: (count > 0) })
  }

  addIngredientHandler = (type) => {
    const ingredientsToUpdate = {
      ...this.state.ingredients
    };
    const updatedQtd = this.state.ingredients[type] + 1; 
    
    ingredientsToUpdate[type] = updatedQtd;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition; 
    
    this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate, });
    this.updatePurchaseState(ingredientsToUpdate);
  }

  removeIngredientHandler = (type) => {
    const ingredientsToUpdate = {
      ...this.state.ingredients
    }
    const oldQtd = this.state.ingredients[type] 
    if (oldQtd <= 0) {
      return;
    } 
    let updatedQtd = this.state.ingredients[type] - 1;
    const priceDeduction = INGREDIENT_PRICES[type];
    let newPrice = this.state.totalPrice - priceDeduction;

    ingredientsToUpdate[type] = updatedQtd;
    
    this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate })
    this.updatePurchaseState(ingredientsToUpdate);
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  }

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchasingContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }
    // [salad: true, meat: false ...]

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing} 
          modalClosed={this.purchasingCancelHandler}
        >
          <OrderSummary 
            ingredients={this.state.ingredients}
            cancelPurchasing={this.purchasingCancelHandler}
            continuePurchasing={this.purchasingContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>

          <Burger ingredients={this.state.ingredients}/>
          <BuildControls  
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchasingHandler}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;