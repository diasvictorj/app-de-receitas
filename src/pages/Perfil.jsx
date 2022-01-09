import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Perfil({ history }) {
  const {email} = JSON.parse(localStorage.getItem('user'));
  console.log(email);


  const receitasFeitasBTN = (<button 
  type='button'
  data-testid="profile-done-btn"
  onClick
>
  Receitas Feitas
</button>);

const receitasFavoritasBTN = (<button 
  type='button'
  data-testid="profile-favorite-btn"
  onClick
>
  Receitas Favoritas
</button>
);

const logOutBTN = (<button 
  type='button'
  data-testid="profile-logout-btn"
onClick
>
  LogOut
</button>
);

  return (
    <div>
      <Header name="Perfil" hideSearch />
      <h3 data-testid="profile-email">{email}</h3>
    
    {receitasFeitasBTN}      
    {receitasFavoritasBTN}
    {logOutBTN}
      
      <MenuInferior history={ history } />
    </div>
  );
}
Perfil.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Perfil;
