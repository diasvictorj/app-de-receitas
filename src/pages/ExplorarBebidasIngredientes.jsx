import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

import MyContext from '../context/Mycontext';

function ExplorarBebidasIngredientes({ history }) {
  const [arrOfIng, setArrOfIng] = useState([]);
  const doze = 12;
  const { setIngredientFilter } = useContext(MyContext);
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((raw) => raw.json())
      .then((res) => res.drinks)
      .then((arr) => arr.filter((_a, idx) => idx < doze))
      .then((fin) => setArrOfIng(fin));
  }, []);
  const handleClick = (ing) => {
    console.log(ing.strIngredient1);
    setIngredientFilter(ing.strIngredient1);
    history.push('/bebidas');
  };
  return (
    <div>
      <Header name="Explorar Ingredientes" hideSearch />
      <MenuInferior history={ history } />
      {
        arrOfIng.length !== 0 && arrOfIng.map((ing, index) => (
          <div
            key={ index }
            aria-hidden="true"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(ing) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
              alt={ ing.strIngredient1 }
            />
            <h4 data-testid={ `${index}-card-name` }>{ing.strIngredient1}</h4>
          </div>
        ))
      }
    </div>
  );
}

ExplorarBebidasIngredientes.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExplorarBebidasIngredientes;
