import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Header from '../components/Header';
import { getMealDetails } from '../services/requestDetails';
import requestAPI from '../services/requestAPI';
import RecomendationCard from '../components/RecomendationCardDrink';

function DetalhesComidas() {
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
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

  useEffect(() => {
    const defineURL = requestAPI('Bebidas', '', 'name');

    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => {
        const recommendedDrinks = e.drinks.slice(0, 6);
        setRecomendations(recommendedDrinks)
      })
      .catch((error) => console.log('Deu ruim', error));

    return () => {

    };
  }, []);

  const renderRecipe = () => (
    <div>
      <img alt="recipies" src={ recipe[0].strMealThumb } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{ recipe[0].strMeal }</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ Math.random() }
            >
              {ingredient}
              {' '}
              {measures[index]}
            </li>
          ))
        }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipe[0].strInstructions }</p>
      <ReactPlayer data-testid="video" controls url={ recipe[0].strYoutube } />
      {
        recomendations && (
          recomendations.map((recomendation, indice) => (
            <RecomendationCard indice={ indice } key={ Math.random() } recomendation={ recomendation } />
          ))
        )
      }
      <button data-testid="start-recipe-btn" type="button">Iniciar</button>
    </div>
  );
  return (
    <div>
      <Header name="Detalhes Comidas" />
      { recipe && renderRecipe() }
    </div>
  );
}

export default DetalhesComidas;
