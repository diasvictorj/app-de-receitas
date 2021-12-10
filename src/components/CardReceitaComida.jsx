import React from 'react';
import PropTypes from 'prop-types';

function CardReceitaComida({ meal: { strMeal, strMealThumb }, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{ strMeal }</span>
    </div>
  );
}

CardReceitaComida.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardReceitaComida;
