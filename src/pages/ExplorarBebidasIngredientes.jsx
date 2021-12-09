import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarBebidasIngredientes({ history }) {
  return (
    <div>
      <Header name="Explorar Ingredientes" hideSearch />
      <MenuInferior history={ history } />
    </div>
  );
}

ExplorarBebidasIngredientes.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarBebidasIngredientes;
