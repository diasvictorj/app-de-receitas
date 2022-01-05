import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';

function EmProgressoBebidas() {
  const { drinks } = useContext(MyContext);
  console.log('OI');
  const {
    strDrink,
    strCategory,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
  } = drinks[0];

  return (
    <div>
      <section>
        <h1 data-testid="recipe-title" >{strDrink}BATATA</h1>
        <h3 data-testid="recipe-category" >{strCategory}</h3>
        <h3>{strAlcoholic}</h3>
      </section>
      <section>
        <img
          data-testid="recipe-photo"
          src={strDrinkThumb}
          alt='Foto não encontrada'
        />
        <button
          data-testid="favorite-btn"
          type='button'>
          Favoritar
        </button>
        <button
          data-testid="share-btn"
          type='button'>
          Compartilhar
        </button>
      </section>
      <section>
        <div id='ingredient-list'>
          <h1>lista de ingredientes</h1>
        </div>
        <div>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type='button'>
          Finalizar Receita
        </button>
      </section>

    </div>
  );
}

export default EmProgressoBebidas;
