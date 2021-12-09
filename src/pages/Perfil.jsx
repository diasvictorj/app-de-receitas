import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Perfil({ history }) {
  return (
    <div>
      <Header name="Perfil" hideSearch />
      <MenuInferior history={ history } />
    </div>
  );
}
Perfil.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Perfil;
