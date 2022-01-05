import React, { useState } from 'react';

import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetalhesBebidas({ history, match: { params: { id } } }) {
  const { pathname } = history.location;
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <main>
      <Header name="Detalhes Bebidas" />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setLinkCopied(true);
          navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
        } }
      >
        Share
      </button>
      {
        isFav ? (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="black heart icon" />
            Fav
          </button>
        ) : (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
          >
            <img src={ whiteHeartIcon } alt="white heart icon" />
            Fav
          </button>
        )
      }
      <button
        className="recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
      {
        linkCopied && <p>Link copiado!</p>
      }
    </main>
  );
}

export default DetalhesBebidas;
