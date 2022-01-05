import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCardMeal({ recomendation, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <span data-testid={ `${index}-recomendation-title` }>
        { recomendation.strMeal }
        {' '}
      </span>
      <span>{ recomendation.strCategory }</span>
      <img src={ recomendation.strMealThumb } alt="" />
    </div>
  );
}

RecomendationCardMeal.propTypes = {
  recomendation: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCardMeal;
