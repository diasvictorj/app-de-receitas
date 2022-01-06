import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailsDetails } from '../services/requestDetails';
import '../css/EmProgresso.css';

function EmProgressoBebidas() {
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const getProgressInitial = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const initialIngredients = getProgressInitial ? getProgressInitial.cocktails[idReceita] : [];
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setChecked] = useState(initialIngredients);

  useEffect(() => {
    getCocktailsDetails(idReceita).then((data) => {
      const recipeKeys = Object.keys(data.drinks[0]);
      const recipeIngredients = recipeKeys
        .filter((key) => key.includes('strIngredient') && data.drinks[0][key])
        .map((i) => data.drinks[0][i]);

      setIngredients(recipeIngredients);
      setRecipe(data.drinks);
    });
  }, [idReceita]);

  useEffect(() => {
    const getProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getProgress) {
      getProgress.cocktails[idReceita] = checkedIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getProgress));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails:{ [idReceita]: checkedIngredients }, meals: {} }));
    }
  }, [checkedIngredients, idReceita]);

  const handleClick = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      setChecked((p) => [...p, value]);
    } else {
      setChecked(checkedIngredients.filter((item) => item !== value));
    }
  };

  if (!recipe) {
    return (<h1>Loading</h1>); /* Fazer componente Loading */
  }
  const {
    strDrink,
    strCategory,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
  } = recipe[0];

  return (
    <div>
      <section>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <h3>{strAlcoholic}</h3>
      </section>
      <section>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt="Foto não encontrada"
        />
        <button data-testid="favorite-btn" type="button">
          Favoritar
        </button>
        <button data-testid="share-btn" type="button">
          Compartilhar
        </button>
      </section>
      <section>
        <div id="ingredient-list">
          {
            ingredients.map((item, i) => (
              <label
                htmlFor="ingredients"
                data-testid={ `${i}-ingredient-step` }
                key={ item }
                className={ checkedIngredients
                  .some((checkedItem) => checkedItem === item) ? 'checked' : '' }
              >
                <input
                  id="ingrediends"
                  value={ item }
                  checked={ checkedIngredients
                    .some((checkedItem) => checkedItem === item) }
                  type="checkbox"
                  onClick={ (event) => handleClick(event) }
                />
                { item }
              </label>))
          }
        </div>
        <div>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <button data-testid="finish-recipe-btn" type="button">
          Finalizar Receita
        </button>
      </section>
    </div>
  );
}

export default EmProgressoBebidas;
