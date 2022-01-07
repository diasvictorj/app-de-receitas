import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarBebidas({ history }) {
  const [randomId, setRandomId] = useState('');
  const requestRandom = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((raw) => raw.json())
      .then((res) => res.drinks[0].idDrink)
      .then((final) => setRandomId(final));
  };
  return (
    <div>
      <Header name="Explorar Bebidas" hideSearch />
      <MenuInferior history={ history } />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => requestRandom() }
      >
        Me Surpreenda!
      </button>
      {
        randomId !== '' && <Redirect to={ `/bebidas/${randomId}` } />
      }
    </div>
  );
}

ExplorarBebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarBebidas;
