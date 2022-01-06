import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ ingredients, checkedIngredients, handleChange }) {
  return (
    <div id="ingredient-list">
      {
        ingredients.map((item, i) => (
          <label
            htmlFor={ `ingredient-${item}` }
            key={ item }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              id={ `ingredient-${item}` }
              value={ item }
              type="checkbox"
              checked={ checkedIngredients
                .some((checkedItem) => checkedItem === item) }
              onChange={ (event) => handleChange(event) }
            />
            <span
              className={ checkedIngredients
                .some((checkedItem) => checkedItem === item) ? 'checked' : '' }
            >
              { item }
            </span>
          </label>))
      }
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  checkedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default IngredientsList;
