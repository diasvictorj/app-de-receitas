import React from 'react';
import PropTypes from 'prop-types';

function CardReceitaBebida({
  drink: { strDrink, strDrinkThumb, idDrink },
  index,
  history,
}) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/bebidas/${idDrink}`) }
      onKeyDown={ () => {} }
      role="button"
      aria-hidden="true" // Solução encontrada no link: https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role
    >
      <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{ strDrink }</span>
    </div>
  );
}

CardReceitaBebida.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardReceitaBebida;
