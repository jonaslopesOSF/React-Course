import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ingredients}) => {
  const arrayOfIngredients = Object.keys(ingredients);
  // ['salad', 'bacon', 'cheese', 'meat']

  let transformedIngredients = 
    arrayOfIngredients.map(ingKey => {

      let forEachIngredient = [...Array(ingredients[ingKey])];
      // [Array(1), Array(1), Array(2), Array(2)]

      return forEachIngredient.map((_, index) => 
        <BurgerIngredient key={ingKey + '-' + index} type={ingKey}/>
      );
      // no matter what, just need the correct name for 'type'
  })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;