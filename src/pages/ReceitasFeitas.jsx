import React, { useEffect, useState } from 'react';
import CardReceitasFeitas from '../components/CardReceitasFeitas';
import Header from '../components/Header';

function ReceitasFeitas() {
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const INITIAL_STATE = getRecipes || [];
  const [doneRecipes, setRecipes] = useState(INITIAL_STATE);
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
      <Header name="Receitas Feitas" hideSearch />
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
          doneRecipes && doneRecipes.map((doneRcp, index) => (
            <CardReceitasFeitas key={ doneRcp.id } recipe={ doneRcp } index={ index } />
          ))
        }
      </section>
    </div>
  );
}

export default ReceitasFeitas;
