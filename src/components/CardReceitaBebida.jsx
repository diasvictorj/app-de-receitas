import React from 'react';
import PropTypes from 'prop-types';

function CardReceitaBebida({ drink: { strDrink, strDrinkThumb }, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{ strDrink }</span>
    </div>
  );
}

CardReceitaBebida.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardReceitaBebida;
