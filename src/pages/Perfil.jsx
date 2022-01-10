import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  function logOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header name="Perfil" hideSearch />
      <h3 data-testid="profile-email">{ user && user.email}</h3>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logOut() }
      >
        Sair
      </button>

      <MenuInferior history={ history } />
    </div>
  );
}

export default Perfil;
