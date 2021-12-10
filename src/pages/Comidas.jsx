import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Comidas({ history }) {
  return (
    <div>
      <Header name="Comidas" />
      <MenuInferior history={ history } />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comidas;
