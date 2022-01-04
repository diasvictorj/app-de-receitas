import React from 'react';
import Header from '../components/Header';

function DetalhesBebidas() {
  return (
    <div>
      <Header name="Detalhes Bebidas" />
      <img alt="recipies" src="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">Title</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">Dynamic</span>
      <ul>Dynamic</ul>
      <h3>Instrucoes</h3>
      <p data-testid="instructions">Dynamic</p>

      <button data-testid="start-recipe-btn" type="button">Iniciar</button>
    </div>
  );
}

export default DetalhesBebidas;
