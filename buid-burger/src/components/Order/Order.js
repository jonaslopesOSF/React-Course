import React from "react";
import classes from "./Order.css";

const order = ({ ingredients, price }) => {
  const ingredientsToShow = [];

  for (let ingredientName in ingredients) {
    ingredientsToShow.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredientsToShow.map(ing => {
    return <span 
              key={ing.name}
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
              }}>
                {ing.name}: ({ing.amount})
            </span>;
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
 
export default order;
