import React from 'react';
import PropTypes from 'prop-types';

function CardReceitaComida({ meal: { strMeal, strMealThumb, idMeal }, index, history }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push({ pathname: `/comidas/${idMeal}` }) }
      onKeyDown={ () => {} }
      role="button"
      aria-hidden="true" // Solução encontrada no link: https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role
    >
      <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{ strMeal }</span>
    </div>
  );
}

CardReceitaComida.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardReceitaComida;
