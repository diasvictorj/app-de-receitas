import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarComidasArea({ history }) {
  return (
    <div>
      <Header name="Explorar Origem" />
      <MenuInferior history={ history } />
    </div>
  );
}

ExplorarComidasArea.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarComidasArea;
