import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarComidas({ history }) {
  const [randomId, setRandomId] = useState('');
  const requestRandom = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((raw) => raw.json())
      .then((res) => res.meals[0].idMeal)
      .then((final) => setRandomId(final));
  };
  return (
    <div>
      <Header name="Explorar Comidas" hideSearch />
      <MenuInferior history={ history } />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
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
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      {
        randomId !== '' && <Redirect to={ `/comidas/${randomId}` } />
      }
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarComidas;
