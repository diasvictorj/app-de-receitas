import React, { useEffect, useState } from 'react';
import CardReceitasFeitas from '../components/CardReceitasFeitas';
import Header from '../components/Header';

function ReceitasFeitas() {
  const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const INITIAL_STATE = getRecipes || [];
  const [favRecipes, setRecipes] = useState(INITIAL_STATE);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    switch (filter) {
    case 'comida':
      return setRecipes((p) => p.filter((recipe) => recipe.type === 'comida'));
    case 'bebida':
      return setRecipes((p) => p.filter((recipe) => recipe.type === 'bebida'));
    default:
      return setRecipes(INITIAL_STATE);
    }
  }, [filter, setRecipes]);

  return (
    <div>
      <Header name="Receitas Favoritas" hideSearch />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drink
        </button>
        {
          favRecipes && favRecipes.map((doneRcp, index) => (
            <CardReceitasFeitas
              key={ doneRcp.id }
              recipe={ doneRcp }
              index={ index }
              isFav
              setRecipes={ setRecipes }
            />
          ))
        }
      </section>
    </div>
  );
}

export default ReceitasFeitas;
