const filterCheck = (radioValue, searchValue) => {
  // Verificação dos Radio buttons
  switch (radioValue) {
  case ('ingredient'):
    return `filter.php?i=${searchValue}`;
    
  case('category'):
    return `filter.php?c=${searchValue}`;

  case ('name'):
    return `search.php?s=${searchValue}`;

  case ('first-letter'):
    return `search.php?f=${searchValue}`;

  case ('categories'):
    return `list.php?c=list`;

  default:
    return null;
  }
};

function requestAPI(name, searchValue, radioValue) {
  // Verificação do Titulo da Pagina
  if (name === 'Comidas') {
    const URLComidas = `https://www.themealdb.com/api/json/v1/1/${filterCheck(radioValue, searchValue)}`;
    return URLComidas;
  } if (name === 'Bebidas') {
    const URLBebidas = `https://www.thecocktaildb.com/api/json/v1/1/${filterCheck(radioValue, searchValue)}`;
    return URLBebidas;
  }
}

export default requestAPI;
