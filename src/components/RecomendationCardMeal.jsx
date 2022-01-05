import React from 'react';

function RecomendationCardMeal({ recomendation, indice }) {
  return (
    <div data-testid={ `${indice}-recomendation-card` }>
      <span data-testid={ `${indice}-recomendation-title` }>
        { recomendation.strMeal }
        {' '}
      </span>
      <span>{ recomendation.strCategory }</span>
      <img src={ recomendation.strMealThumb } alt="" />
    </div>
  );
}

export default RecomendationCardMeal;
