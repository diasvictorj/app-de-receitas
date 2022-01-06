import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealDetails } from '../services/requestDetails';
import '../css/EmProgresso.css';

function EmProgressoComidas() {
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const getProgressInitial = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const initialIngredients = getProgressInitial && getProgressInitial.meals[idReceita]
    ? getProgressInitial.meals[idReceita] : [];
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setChecked] = useState(initialIngredients);

  useEffect(() => {
    getMealDetails(idReceita).then((data) => {
      const recipeKeys = Object.keys(data.meals[0]);
      const recipeIngredients = recipeKeys
        .filter((key) => key.includes('strIngredient') && data.meals[0][key])
        .map((i) => data.meals[0][i]);

      setIngredients(recipeIngredients);
      setRecipe(data.meals);
    });
  }, [idReceita]);

  useEffect(() => {
    const getProgress = JSON.parse(localStorage.getItem('inProgessRecipes'));
    if (getProgress) {
      getProgress.meals[idReceita] = checkedIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getProgress));
    } else {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: { [idReceita]: checkedIngredients }, cocktails: {} }));
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
    strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
  } = recipe[0];

  return (
    <div>
      <section>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
      </section>
      <section>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
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
                htmlFor={ `ingredient-${item}` }
                key={ item }
                data-testid={ `${i}-ingredient-step` }
              >
                <input
                  id={ `ingredient-${item}` }
                  value={ item }
                  type="checkbox"
                  checked={ checkedIngredients
                    .some((checkedItem) => checkedItem === item) }
                  onChange={ (event) => handleClick(event) }
                />
                <span
                  className={ checkedIngredients
                    .some((checkedItem) => checkedItem === item) ? 'checked' : '' }
                >
                  { item }
                </span>
              </label>))
          }
        </div>
        <div>
          <p data-testid="instructions">{ strInstructions }</p>
        </div>
        <button data-testid="finish-recipe-btn" type="button">
          Finalizar Receita
        </button>
      </section>
    </div>
  );
}

export default EmProgressoComidas;
