import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';
import CardReceitaBebida from '../components/CardReceitaBebida';

function Bebidas({ history }) {
  const { drinks } = useContext(MyContext);

  const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const doze = 12;

  const renderCards = () => drinks.filter((_, i) => i < doze)
    .map((drink, index) => (
      <CardReceitaBebida drink={ drink } index={ index } key={ drink.idDrink } />
    ));

  return (
    <div>
      <Header name="Bebidas" />
      <MenuInferior history={ history } />
      {
        (drinks && drinks.length === 1)
        && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />
      }
      {
        drinks ? renderCards() : global.alert(message)
      }
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Bebidas;
