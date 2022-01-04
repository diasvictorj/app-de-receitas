export function getMealDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(url)
    .then((response) => response.json());
}

export function getCocktailsDetails(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(url)
    .then((response) => response.json());
}
