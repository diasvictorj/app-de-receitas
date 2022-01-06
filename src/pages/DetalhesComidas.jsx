import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from '../components/Header';
import { getMealDetails } from '../services/requestDetails';
import requestAPI from '../services/requestAPI';
import RecomendationCard from '../components/RecomendationCardDrink';
import 'swiper/swiper.min.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetalhesComidas() {
  const history = useHistory();
  const { pathname } = history.location;
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const [linkCopied, setLinkCopied] = useState(false);
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isFav, setFav] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);

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
  }, [idReceita]);

  useEffect(() => {
    const defineURL = requestAPI('Bebidas', '', 'name');

    fetch(defineURL)
      .then((response) => response.json())
      .then((e) => {
        const maxIndex = 6;
        const recommendedDrinks = e.drinks.slice(0, maxIndex);
        setRecomendations(recommendedDrinks);
      })
      .catch((error) => console.log('Deu ruim', error));

    return () => {

    };
  }, []);

  useEffect(() => {
    const getStoragedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const getStoragedinProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    const getStoragedFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getStoragedFavRecipes) {
      setFav(getStoragedFavRecipes.some((r) => r.id === idReceita));
    }

    if (getStoragedinProgressRecipes) {
      setInProgress((getStoragedinProgressRecipes.meals[idReceita]));
    }

    if (getStoragedDoneRecipes) {
      setIsDone(getStoragedDoneRecipes.some((r) => r.id === idReceita));
    }
  }, [idReceita]);

  const handleFavButtonClick = () => {
    const {
      idMeal: id,
      strCategory: category,
      strArea: area,
      strMeal,
      strMealThumb: image,
    } = recipe[0];

    const recipeToStorage = {
      id,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
      name: strMeal,
      image,
    };

    setFav((p) => !p);

    const getFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const handleFav = getFav ? [...getFav, recipeToStorage] : [recipeToStorage];
    localStorage.setItem('favoriteRecipes', JSON.stringify(handleFav));
  };

  const renderRecipe = () => (
    <div style={ { position: 'relative' } }>
      <img alt="recipies" src={ recipe[0].strMealThumb } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{ recipe[0].strMeal }</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setLinkCopied(true);
          navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
        } }
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        onClick={ handleFavButtonClick }
      >
        <img
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt={ `${isFav ? 'black' : 'white'} heart icon` }
        />
        Favoritar
      </button>
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
      {
        !isDone && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`/comidas/${idReceita}/in-progress`) }
            style={ { position: 'fixed', bottom: '0' } }
          >
            { inProgress ? 'Continuar' : 'Iniciar'}
            {' '}
            Receita
          </button>
        )
      }
      {
        linkCopied && <p>Link copiado!</p>
      }
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
