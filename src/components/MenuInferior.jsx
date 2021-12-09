import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/MenuInferior.css';

function MenuInferior({ history }) {
  return (
    <footer data-testid="footer" className="menuInferior">
      <button
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
        type="button"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        type="button"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="" />
      </button>
      <button
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
        type="button"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="" />
      </button>
    </footer>
  );
}

MenuInferior.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuInferior;
