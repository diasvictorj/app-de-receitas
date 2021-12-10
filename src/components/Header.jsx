import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/Mycontext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import requestAPI from '../services/requestAPI';

function Header({ name, hideSearch }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { setMeals, setDrinks, setRedirect } = useContext(MyContext);

  const handleClick = () => {
    if (radioValue === 'first-letter'
      && searchValue.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    const defineURL = requestAPI(name, searchValue, radioValue);
    if (name === 'Comidas') {
      fetch(defineURL)
        .then((response) => response.json())
        .then((e) => setMeals(e.meals))
        .catch((error) => console.log('Deu ruim', error));
    }
    if (name === 'Bebidas') {
      fetch(defineURL)
        .then((response) => response.json())
        .then((e) => setDrinks(e.drinks))
        .catch((error) => console.log('Deu ruim', error));
    }
    setRedirect(true);
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
              onClick={ () => setSearchBar(!searchBar) }
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
