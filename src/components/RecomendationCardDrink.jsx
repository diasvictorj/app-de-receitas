import React from 'react';

function RecomendationCardDrink({ recomendation, indice }) {
  return (
    <div data-testid={ `${indice}-recomendation-card` }>
      <span data-testid={ `${indice}-recomendation-title` }>
        { recomendation.strDrink }
        {' '}
      </span>

      <span>{ recomendation.strAlcoholic }</span>
      <img src={ recomendation.strDrinkThumb } alt="" width="500px" />
    </div>
  );
}

export default RecomendationCardDrink;
