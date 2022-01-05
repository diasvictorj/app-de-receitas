import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCardDrink({ recomendation, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <span data-testid={ `${index}-recomendation-title` }>
        { recomendation.strDrink }
        {' '}
      </span>

      <span>{ recomendation.strAlcoholic }</span>
      <img src={ recomendation.strDrinkThumb } alt="" width="100%" />
    </div>
  );
}

RecomendationCardDrink.propTypes = {
  recomendation: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCardDrink;
