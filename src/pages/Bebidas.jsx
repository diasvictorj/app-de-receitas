import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Bebidas({ history }) {
  return (
    <div>
      <Header name="Bebidas" />
      <MenuInferior history={ history } />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Bebidas;
