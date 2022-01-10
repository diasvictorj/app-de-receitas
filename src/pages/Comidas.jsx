import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';
import CardReceitaComida from '../components/CardReceitaComida';
import requestAPI from '../services/requestAPI';

function Comidas({ history }) {
  const { meals, setMeals, redirect, setRedirect,
    ingredientFilter, setIngredientFilter } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(undefined);
  const message = ('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  const doze = 12;
  const maxCategoriesLength = 5;

  useEffect(() => {
    setMeals([]);
    const defineURL = ingredientFilter === '' ? requestAPI('Comidas', '', 'name')
      : requestAPI('Comidas', ingredientFilter, 'ingredient');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setMeals(e.meals))
      .catch((error) => console.log('Deu ruim', error));
    setIngredientFilter('');
  }, [setMeals, setIngredientFilter]);

  useEffect(() => {
    const defineURL = requestAPI('Comidas', '', 'categories');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setCategories(e.meals))
      .catch((error) => console.log('Deu ruim', error));
  }, []);

  const renderCards = () => meals.filter((_, i) => i < doze)
    .map((meal, index) => (
      <CardReceitaComida
        meal={ meal }
        index={ index }
        key={ meal.idMeal }
        history={ history }
      />
    ));

  const handleClick = (searchValue) => {
    const verifyCategory = (searchValue === currentCategory || searchValue === 'All');

    setRedirect(false);
    if (verifyCategory) {
      setCurrentCategory('');
    } else {
      setCurrentCategory(searchValue);
    }

    const defineURL = verifyCategory
      ? requestAPI('Comidas', '', 'name')
      : requestAPI('Comidas', searchValue, 'category');

    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setMeals(e.meals))
      .catch((error) => console.log('Deu ruim', error));
  };

  return (
    <div>
      <Header name="Comidas" />
      {
        categories && (
          categories.filter((_category, index) => index < maxCategoriesLength)
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
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
      >
        All
      </button>
      {
        (meals && meals.length === 1 && redirect)
          && <Redirect to={ `/comidas/${meals[0].idMeal}` } />
      }
      {
        meals ? renderCards() : global.alert(message)
      }
      <MenuInferior history={ history } />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comidas;
