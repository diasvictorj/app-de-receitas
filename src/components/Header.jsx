import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name, hideSearch }) {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn" src={ profileIcon }>
        <img src={ profileIcon } alt="" />
      </button>

      <h1 data-testid="page-title">{ name }</h1>
      {
        !hideSearch && (
          <button type="button" data-testid="search-top-btn" src={ searchIcon }>
            <img src={ searchIcon } alt="" />
          </button>
        )
      }
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
