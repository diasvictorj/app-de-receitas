import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Explorar({ history }) {
  return (
    <div>
      <Header name="Explorar" hideSearch />
      <section>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>

        <button
          id="drinks"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </section>
      <MenuInferior history={ history } />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Explorar;
