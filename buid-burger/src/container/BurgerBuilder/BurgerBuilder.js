import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliarity/Auxiliarity';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from  '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.0,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 3,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount () {
    console.log(this.props)
    // axios.get("https://react-my-burger-46b0f.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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
      ...this.props.ings
    };
    const updatedQtd = this.props.ings[type] + 1;

    ingredientsToUpdate[type] = updatedQtd;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate, });
    this.updatePurchaseState(ingredientsToUpdate);
  }

  removeIngredientHandler = (type) => {
    const ingredientsToUpdate = {
      ...this.props.ings
    }
    const oldQtd = this.props.ings[type]
    if (oldQtd <= 0) {
      return;
    }
    let updatedQtd = this.props.ings[type] - 1;
    const priceDeduction = INGREDIENT_PRICES[type];
    let newPrice = this.state.totalPrice - priceDeduction;

    ingredientsToUpdate[type] = updatedQtd;

    this.setState({
      totalPrice: newPrice,
      ingredients: ingredientsToUpdate
    })
    this.updatePurchaseState(ingredientsToUpdate);
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  }

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchasingContinueHandler = () => {

    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    }
    queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice))
    // queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  disabledInfo = () => {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }
    return disabledInfo;
  }

  setBurgerWithContent = () => {
    const disabledInfo = this.disabledInfo();
    // [salad: true, meat: false ...
    const burger = (
      <Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchasingHandler}
          ingredients={this.props.ings}
        />
     </Aux>
    )
    return burger;
  }

  setOrderSummaryWithContent = () => {
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ings}
        cancelPurchasing={this.purchasingCancelHandler}
        continuePurchasing={this.purchasingContinueHandler}
        totalPrice={this.state.totalPrice}
      />
    )
    if ( this.state.loading ) {
      orderSummary = <Spinner />
    }
    return orderSummary;
  }

  render() {
    let orderSummary = <Spinner />
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p>
                                  : <Spinner />
    if ( this.props.ings ) {
      burger = this.setBurgerWithContent();
      orderSummary = this.setOrderSummaryWithContent();
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));