import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarBebidas({ history }) {
  return (
    <div>
      <Header name="Explorar Bebidas" hideSearch />
      <MenuInferior history={ history } />
    </div>
  );
}

ExplorarBebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarBebidas;
