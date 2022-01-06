import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Favoritar({ isFav, handleFavButtonClick }) {
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        onClick={ handleFavButtonClick }
      >
        <img
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt={ `${isFav ? 'black' : 'white'} heart icon` }
        />
        Favoritar
      </button>
    </div>
  );
}

Favoritar.propTypes = {
  isFav: PropTypes.bool.isRequired,
  handleFavButtonClick: PropTypes.func.isRequired,
};

export default Favoritar;
