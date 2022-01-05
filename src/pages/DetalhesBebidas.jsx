import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import MyContext from '../context/Mycontext';
import Header from '../components/Header';
import { getCocktailsDetails } from '../services/requestDetails';
import requestAPI from '../services/requestAPI';
import RecomendationCard from '../components/RecomendationCardMeal';
import 'swiper/swiper.min.css';

function DetalhesBebidas({ history }) {
  const params = useParams();
  const { id_da_receita: idReceita } = params;

  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const { setInProgress } = useContext(MyContext);

  useEffect(() => {
    getCocktailsDetails(idReceita).then((data) => {
      const recipeKeys = Object.keys(data.drinks[0]);
      const recipeIngredients = recipeKeys
        .filter((key) => key.includes('strIngredient') && data.drinks[0][key])
        .map((i) => data.drinks[0][i]);

      const recipeMeasures = recipeKeys
        .filter((key) => key.includes('strMeasure') && data.drinks[0][key] !== ' ')
        .map((i) => data.drinks[0][i]);

      setIngredients(recipeIngredients);
      setMeasures(recipeMeasures);
      setRecipe(data.drinks);
    });
  }, []);

  useEffect(() => {
    const defineURL = requestAPI('Comidas', '', 'name');

    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => {
        const maxIndex = 6;
        const recommendedMeals = e.meals.slice(0, maxIndex);
        setRecomendations(recommendedMeals);
      })
      .catch((error) => console.log('Deu ruim', error));

    return () => {

    };
  }, []);

  const handleClick = () => {
    const inProgressRecipe = {
      recipe,
      ingredients,
    };
    setInProgress(inProgressRecipe);
    history.push(`/bebidas/${idReceita}/in-progress`);
  };

  const renderRecipe = () => (
    <div>
      <img alt="recipies" src={ recipe[0].strDrinkThumb } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{ recipe[0].strDrink }</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">{ recipe[0].strAlcoholic }</span>
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
      {
        recomendations && (
          <Swiper spaceBetween={ 50 } slidesPerView={ 2 } direction="horizontal">
            {
              recomendations.map((recomendation, indice) => (
                <SwiperSlide key={ Math.random() }>
                  <RecomendationCard
                    index={ indice }
                    recomendation={ recomendation }
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        )
      }
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => handleClick() }
      >
        Iniciar
      </button>
    </div>
  );

  return (
    <div>
      <Header name="Detalhes Bebidas" />
      { recipe && renderRecipe() }
    </div>
  );
}

DetalhesBebidas.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DetalhesBebidas;
