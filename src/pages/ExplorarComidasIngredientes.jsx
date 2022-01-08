import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';

function ExplorarComidasIngredientes({ history }) {
  const [arrOfIng, setArrOfIng] = useState([]);
  const doze = 12;
  const { setIngredientFilter } = useContext(MyContext);
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((raw) => raw.json())
      .then((res) => res.meals)
      .then((arr) => arr.filter((_a, idx) => idx < doze))
      .then((fin) => setArrOfIng(fin));
  }, []);
  const handleClick = (ing) => {
    console.log(ing.strIngredient);
    setIngredientFilter(ing.strIngredient);
    history.push('/comidas');
  };
  return (
    <div>
      <Header name="Explorar Ingredientes" hideSearch />
      <MenuInferior history={ history } />
      {
        arrOfIng.length !== 0 && arrOfIng.map((ing, index) => (
          <div
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(ing) }
            key={ index }
            aria-hidden="true"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
              alt={ ing.strIngredient }
            />
            <h4 data-testid={ `${index}-card-name` }>{ing.strIngredient}</h4>
          </div>
        ))
      }
    </div>
  );
}

ExplorarComidasIngredientes.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarComidasIngredientes;
