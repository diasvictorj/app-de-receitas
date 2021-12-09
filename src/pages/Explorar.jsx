import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Explorar({ history }) {
  return (
    <div>
      <Header name="Explorar" hideSearch />
      <MenuInferior history={ history } />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Explorar;
