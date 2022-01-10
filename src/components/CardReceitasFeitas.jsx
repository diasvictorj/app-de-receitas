import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function CardReceitasFeitas({ recipe, index, isFav = false, setRecipes = () => {} }) {
  const { image, id, area, tags, doneDate,
    name, category, alcoholicOrNot, type } = recipe;
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();
  const [isFavRecipe, setFav] = useState(true);

  const handleFavButtonClick = () => {
    setFav((p) => !p);

    const getFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterFav = getFav.filter((rcp) => rcp.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFav));
    setRecipes(filterFav);
  };

  return (
    <div>
      <section>
        <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            width="250px"
          />
        </button>

      </section>
      <section>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'comida' ? `${area} - ${category}` : alcoholicOrNot
          }
        </h4>
        <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
          <h1 data-testid={ `${index}-horizontal-name` }>{ name }</h1>

        </button>
        {
          !isFav && (
            <h3 data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              {' '}
              { doneDate }
            </h3>
          )
        }
      </section>
      <section>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ Share }
          onClick={ () => {
            setLinkCopied(true);
            navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          } }
        >
          <img src={ Share } alt="compartilhar" />
        </button>
        {
          (!isFav && tags) && tags.map((tagName) => (
            <h4
              key={ Math.random() }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}

            </h4>
          ))
        }
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavRecipe ? blackHeartIcon : whiteHeartIcon }
          onClick={ handleFavButtonClick }
        >
          <img
            src={ isFavRecipe ? blackHeartIcon : whiteHeartIcon }
            alt={ `${isFavRecipe ? 'black' : 'white'} heart icon` }
          />
          Favoritar
        </button>

        {
          linkCopied && <p>Link copiado!</p>
        }
      </section>
    </div>
  );
}

CardReceitasFeitas.propTypes = {
  recipe: PropTypes.objectOf([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  index: PropTypes.number.isRequired,
  isFav: PropTypes.bool.isRequired,
  setRecipes: PropTypes.func.isRequired,
};

export default CardReceitasFeitas;
