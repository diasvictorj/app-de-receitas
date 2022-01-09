import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function habilitaButton() {
    const seis = 6;

    const maskEmail = (/\S+@\S+\.\S+/); // Expressão obtida na fonte: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/

    if (password.length > seis && maskEmail.test(email)) {
      return false;
    } return (true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="input-email">
        Email
        <input
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>

      <label htmlFor="input-password">
        Senha
        <input
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        type="submit"
        disabled={ habilitaButton() }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Login;
