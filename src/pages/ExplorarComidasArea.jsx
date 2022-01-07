import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import requestAPI from '../services/requestAPI';
import CardReceitaComida from '../components/CardReceitaComida';
import MyContext from '../context/Mycontext';

function ExplorarComidasArea({ history }) {
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentArea, setCurrentArea] = useState(undefined);
  const message = ('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  const doze = 12;
  const { meals, setMeals, redirect, setRedirect } = useContext(MyContext);

  useEffect(() => {
    const defineURL = requestAPI('Comidas', '', 'name');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setMeals(e.meals))
      .catch((error) => console.log('Deu ruim', error));
  }, [setMeals]);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    fetch(url)
      .then((response) => response.json())
      .then((area) => {
        const arrayArea = area.meals;
        setAreas(arrayArea.map((item) => item.strArea));
      });
  }, []);

  useEffect(() => {
    const defineURL = requestAPI('Comidas', '', 'categories');
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => {
        const arrayCategories = e.meals;
        setCategories(arrayCategories.map((item) => item.strCategory));
      })
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

  const handleChange = ({ target }) => {
    const searchValue = target.value;
    const verifyArea = (searchValue === currentArea || searchValue === 'All');

    setRedirect(false);
    if (verifyArea) {
      setCurrentArea('');
    } else {
      setCurrentArea(searchValue);
    }

    const defineURL = verifyArea
      ? requestAPI('Comidas', '', 'name')
      : requestAPI('Comidas', searchValue, 'area');

    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setMeals(e.meals))
      .catch((error) => console.log('Deu ruim', error));
  };

  if (!areas || !categories) {
    return (<h1>loading</h1>);
  }
  return (
    <div>
      <Header name="Explorar Origem" />
      <section>
        <select
          onChange={ (event) => handleChange(event) }
          name="areas"
          data-testid="explore-by-area-dropdown"
        >
          <option
            name="All"
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {
            areas.map((area) => (
              <option
                name={ area }
                key={ area }
                value={ area }
                data-testid={ `${area}-option` }
              >
                { area }
              </option>
            ))
          }
        </select>
        <section>
          {
            (meals && meals.length === 1 && redirect)
          && <Redirect to={ `/comidas/${meals[0].idMeal}` } />
          }
          {
            meals ? renderCards() : global.alert(message)
          }
        </section>
      </section>

      <MenuInferior history={ history } />
    </div>
  );
}

ExplorarComidasArea.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ExplorarComidasArea;
