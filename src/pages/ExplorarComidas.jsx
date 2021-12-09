import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarComidas({ history }) {
  return (
    <div>
      <Header name="Explorar Comidas" hideSearch />
      <MenuInferior history={ history } />
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarComidas;
