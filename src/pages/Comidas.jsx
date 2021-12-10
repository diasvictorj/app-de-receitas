import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';
import CardReceitaComida from '../components/CardReceitaComida';

function Comidas({ history }) {
  const { meals } = useContext(MyContext);
  const message = ('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  const doze = 12;

  const renderCards = () => meals.filter((_, i) => i < doze)
    .map((meal, index) => (
      <CardReceitaComida meal={ meal } index={ index } key={ meal.idMeal } />
    ));

  return (
    <div>
      <Header name="Comidas" />
      {
        (meals && meals.length === 1) && <Redirect to={ `/comidas/${meals[0].idMeal}` } />
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
