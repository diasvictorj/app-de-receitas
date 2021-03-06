import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Favoritar from '../components/Favoritar';
import IngredientsList from '../components/IngredientsList';
import '../css/EmProgresso.css';
import { getMealDetails } from '../services/requestDetails';

function handleFinishBtnClick(recipe, history) {
  const getDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const {
    idMeal: id,
    strCategory: category,
    strArea: area,
    strMeal,
    strMealThumb: image,
    strTags: [...tags],
  } = recipe[0];

  const doneDate = new Date();

  const newRecipe = {
    id,
    type: 'comida',
    category,
    area,
    alcoholicOrNot: '',
    name: strMeal,
    image,
    doneDate,
    tags,
  };

  if (getDone) {
    localStorage.setItem('doneRecipes', JSON.stringify([...getDone, newRecipe]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newRecipe]));
  }

  history.push('/receitas-feitas');
}

function EmProgressoComidas() {
  const history = useHistory();
  const params = useParams();
  const { id_da_receita: idReceita } = params;
  const getProgressInitial = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const initialIngredients = getProgressInitial && getProgressInitial.meals[idReceita]
    ? getProgressInitial.meals[idReceita] : [];
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setChecked] = useState(initialIngredients);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFav, setFav] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  useEffect(() => {
    const getStoragedFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getStoragedFavRecipes) {
      setFav(getStoragedFavRecipes.some((r) => r.id === idReceita));
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

  const handleChange = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      setChecked((p) => [...p, value]);
    } else {
      setChecked(checkedIngredients.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    setDisabled(checkedIngredients.length !== ingredients.length);
  }, [checkedIngredients, ingredients]);

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
          alt="Foto n??o encontrada"
        />
        <Favoritar handleFavButtonClick={ handleFavButtonClick } isFav={ isFav } />
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            setLinkCopied(true);
            navigator.clipboard.writeText(`http://localhost:3000/comidas/${idReceita}`);
          } }
        >
          Compartilhar
        </button>
      </section>
      <section>
        <IngredientsList
          ingredients={ ingredients }
          checkedIngredients={ checkedIngredients }
          handleChange={ handleChange }
        />
        <div>
          <p data-testid="instructions">{ strInstructions }</p>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => handleFinishBtnClick(recipe, history) }
          disabled={ disabled }
        >
          Finalizar Receita
        </button>
        {
          linkCopied && <p>Link copiado!</p>
        }
      </section>
    </div>
  );
}

export default EmProgressoComidas;
