import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getMealDetails } from '../services/requestDetails';

function DetalhesComidas() {
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  useEffect(() => {
    getMealDetails(idReceita).then((data) => {
      const recipeKeys = Object.keys(data.meals[0]);
      const recipeIngredients = recipeKeys
        .filter((key) => key.includes('strIngredient') && data.meals[0][key])
        .map((i) => data.meals[0][i]);

      const recipeMeasures = recipeKeys
        .filter((key) => key.includes('strMeasure') && data.meals[0][key] !== ' ')
        .map((i) => data.meals[0][i]);

      setIngredients(recipeIngredients);
      setMeasures(recipeMeasures);
      setRecipe(data.meals);
    });
  }, []);

  const renderRecipe = () => {
    return (
      <div>
        <img alt="recipies" src={ recipe[0].strMealThumb } data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{ recipe[0].strMeal }</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
        <ul>
          {
            ingredients.map((ingredient, index) => {
              return (
                <li data-testid={ `${index}-ingredient-name-and-measure` } key={ Math.random() }>
                  {ingredient}
                  {' '}
                  {measures[index]}
                </li>
              );
            })
          }
        </ul>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipe[0].strInstructions }</p>
        <video data-testid="video" controls>
          <source src={ recipe[0].strYoutube } type="" />
        </video>
        {/* <RecomendationCard data-testid={ `${index}-recomendation-card` } /> */}
        <button data-testid="start-recipe-btn" type="button">Iniciar</button>
      </div>
    );
  };
  return (
    <div>
      <Header name="Detalhes Comidas" />
      { recipe && renderRecipe() }
    </div>
  );
}

export default DetalhesComidas;
