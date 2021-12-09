import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import requestAPI from '../services/requestAPI';
import MyContext from '../context/Mycontext';

function Header({ name, hideSearch }) {
  const [searchBar, setBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { setData, API_RESULTS } = useContext(MyContext);

  const handleClick = () => {
    if (radioValue === 'first-letter'
      && searchValue.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    const defineURL = requestAPI(name, searchValue, radioValue);
    console.log(defineURL);
    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => setData(e))
      .catch((error) => console.log('Deu ruim', error));
  };

  return (
    <div>

      <header>
        <Link to="/perfil">
          <button
            type="button"
            data-testid="profile-top-btn"
            src={ profileIcon }
          >
            <img src={ profileIcon } alt="" />
          </button>
        </Link>
        <h1 data-testid="page-title">{name}</h1>
        {
          !hideSearch && (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ () => setBar(!searchBar) }
            >
              <img src={ searchIcon } alt="" />
            </button>
          )
        }
      </header>
      {searchBar && (
        <div>
          <label htmlFor='"search-text-input"'>
            Pesquisar
            <input
              id="search-text-input"
              type="text"
              data-testid="search-input"
              value={ searchValue }
              onChange={ (e) => setSearchValue(e.target.value) }
            />
          </label>
          <label htmlFor="ingredient-radio">
            Ingredientes
            <input
              name="radio-filter"
              id="ingredient-radio"
              value="ingredient"
              onChange={ (e) => setRadioValue(e.target.value) }
              type="radio"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name-radio">
            Nome
            <input
              name="radio-filter"
              id="name-radio"
              value="name"
              onChange={ (e) => setRadioValue(e.target.value) }
              type="radio"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter-radio">
            Busar pela primeira letra
            <input
              name="radio-filter"
              id="first-letter-radio"
              value="first-letter"
              onChange={ (e) => setRadioValue(e.target.value) }
              type="radio"
              data-testid="first-letter-search-radio"
            />
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => handleClick() }
          >
            Buscar
          </button>
        </div>
      )}

      {
        API_RESULTS.meals.length === 1 ? <Redirect to={ `/${name.toLowerCase()}/${API_RESULTS.meals[0].idMeal}` } /> : null
      }
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hideSearch: PropTypes.bool,
};

Header.defaultProps = {
  hideSearch: false,
};

export default Header;
