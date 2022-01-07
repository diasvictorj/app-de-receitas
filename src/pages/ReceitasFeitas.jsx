import React from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  return (
    <div>
      <Header name="Receitas Feitas" hideSearch />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-bnt"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-bnt"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-bnt"
        >
          Drink
        </button>
      </section>
    </div>
  );
}

export default ReceitasFeitas;
