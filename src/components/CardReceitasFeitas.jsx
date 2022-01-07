import React from 'react';

const CardReceitasFeitas = () => {
  return (
    <div>
      <section>
        <img
          data-testid={ `${index}-horizontal-image` }
          src=""
          alt=""
        />
      </section>
      <section>
        <h4 data-testid={ `${index}-horizontal-top-text` }>placeholder</h4>
        <h1 data-testid={ `${index}-horizontal-name` }>placeholder</h1>
        <h3 data-testid={ `${index}-horizontal-done-date` }>Feita em: placeholder</h3>
      </section>
      <section>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          share
        </button>
        <h2 data-testid={ `${index}-${tagName}-horizontal-tag` }>placeholder</h2>
      </section>
    </div>
  );
};

export default CardReceitasFeitas;
