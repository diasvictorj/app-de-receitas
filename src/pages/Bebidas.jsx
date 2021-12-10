import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';
import CardReceitaBebida from '../components/CardReceitaBebida';

import requestAPI from '../services/requestAPI';

function Bebidas({ history }) {
  const { drinks, setDrinks } = useContext(MyContext);
  const [categories, setCategories] = useState([]);

  const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const doze = 12;
  const maxCategoriesLength = 5;

  const renderCards = () => drinks.filter((_, i) => i < doze)
    .map((drink, index) => (
      <CardReceitaBebida drink={ drink } index={ index } key={ drink.idDrink } />
    ));

  useEffect(() => {
    const defineURL = requestAPI('Bebidas', '', 'name');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setDrinks(e.drinks))
      .catch((error) => console.log('Deu ruim', error));
  }, [setDrinks]);

  useEffect(() => {
    const defineURL = requestAPI('Bebidas', '', 'categories');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setCategories(e.drinks))
      .catch((error) => console.log('Deu ruim', error));
  }, []);

  const handleClick = (searchValue) => {
    const defineURL = requestAPI('Bebidas', searchValue, 'category');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setDrinks(e.drinks))
      .catch((error) => console.log('Deu ruim', error));
  }

  return (
    <div>
      <Header name="Bebidas" />
      {
        categories && (
          categories.filter((_, index) => index < maxCategoriesLength)
            .map(({ strCategory }) => (
              <button
                key={ strCategory }
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClick(strCategory) }
              >
                {strCategory}
              </button>
            ))
        )
      }
      {
        (drinks && drinks.length === 1)
        && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />
      }
      {
        drinks ? renderCards() : global.alert(message)
      }
      <MenuInferior history={ history } />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Bebidas;
