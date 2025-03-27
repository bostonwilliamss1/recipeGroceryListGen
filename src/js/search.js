
const API_KEY = import.meta.env.VITE_API_KEY;
const recipeContainer = document.getElementById('Queried_recipe_container');
const cuisineSelect = document.getElementById('cuisine');
const dietCheckboxes = document.querySelectorAll('input[name="diet"]');
const mealTypeSelect = document.getElementById('meal-type');
const searchForm = document.getElementById('search');
const searchInput = document.querySelector('.search');

async function fetchRecipes(query = '') {
  const cuisine = cuisineSelect.value !== 'null' ? cuisineSelect.value : '';
  const diet = Array.from(dietCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value)
    .join(',');
  const mealType = mealTypeSelect.value;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&cuisine=${cuisine}&diet=${diet}&type=${mealType}&number=10&addRecipeInformation=true`
    );
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = recipes.length
    ? recipes
        .map(
          (recipe) => `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.summary.split('.').slice(0, 1).join('.')}.</p>
      </div>`
        )
        .join('')
    : '<p>No recipes found. Try a different search!</p>';
}

cuisineSelect.addEventListener('change', () => fetchRecipes(searchInput.value));
dietCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', () => fetchRecipes(searchInput.value)));
mealTypeSelect.addEventListener('change', () => fetchRecipes(searchInput.value));


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchRecipes(searchInput.value);
});


fetchRecipes();
