import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function CardReceitasFeitas({ recipe, index }) {
  const { image, id, area, tags, doneDate,
    name, category, alcoholicOrNot, type } = recipe;
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();

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
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          Feita em:
          {' '}
          { doneDate }
        </h3>
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
          tags && tags.map((tagName) => (
            <h4
              key={ Math.random() }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}

            </h4>
          ))
        }

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
};

export default CardReceitasFeitas;
