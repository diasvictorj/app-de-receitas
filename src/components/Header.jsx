import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name, hideSearch }) {
  const [searchBar, setBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header>
      <Link to="/perfil">
      <button type="button" data-testid="profile-top-btn" src={ profileIcon }
      >
        <img src={ profileIcon } alt="" />
      </button>
      </Link>
      <h1 data-testid="page-title">{ name }</h1>
      {
        !hideSearch && (
          <button 
            type="button" 
            data-testid="search-top-btn" 
            src={ searchIcon } 
            onClick={ () => setBar(!searchBar)}
          >
            <img src={ searchIcon } alt="" />
          </button>
        )
      }
      { searchBar && (
        <label htmlFor='"search-text-input"'>
          Pesquisar
          <input 
            id="search-text-input"
            type="text"
            data-testid="search-input"
            value={ searchValue }
            onChange={ setSearchValue }
          />
        </label>
      )}
    </header>
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
