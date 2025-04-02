const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.spoonacular.com/recipes";
const recipeContainer = document.getElementById("Queried_recipe_container");
const cuisineSelect = document.getElementById("cuisine");
const dietCheckboxes = document.querySelectorAll("input[name='diet']");
const mealTypeSelect = document.getElementById("meal-type");
const searchForm = document.getElementById("search");
const searchInput = searchForm.querySelector(".search");
const shoppingItems = document.getElementById("shopping-items");

document.addEventListener("DOMContentLoaded", () => {
  attachEventListeners();
  fetchRecipes();
  loadShoppingList();
});

function attachEventListeners() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchRecipes(searchInput.value);
  });

  [cuisineSelect, mealTypeSelect, ...dietCheckboxes].forEach((element) => {
    element.addEventListener("change", () => fetchRecipes(searchInput.value));
  });
}

async function fetchRecipes(query = "") {
  const cuisine = cuisineSelect.value !== "null" ? cuisineSelect.value : "";
  const diet = Array.from(dietCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value)
    .join(",");
  const mealType = mealTypeSelect.value !== "null" ? mealTypeSelect.value : "";

  try {

    const searchResponse = await fetch(
      `${API_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&cuisine=${cuisine}&diet=${diet}&type=${mealType}&number=10`
    );
    const searchData = await searchResponse.json();
    
   
    const recipePromises = searchData.results.map(async (recipePreview) => {
      const detailResponse = await fetch(
        `${API_URL}/${recipePreview.id}/information?apiKey=${API_KEY}`
      );
      return await detailResponse.json();
    });
    
    const detailedRecipes = await Promise.all(recipePromises);
    displayRecipes(detailedRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
  }
}

function displayRecipes(recipes) {
  if (!recipeContainer) return;
  recipeContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found. Try different search criteria.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");

    const ingredients = recipe.extendedIngredients
      ? recipe.extendedIngredients.map((ing) => ing.original)
      : [];

    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} min</p>
      <button class="add-to-list" data-ingredients='${JSON.stringify(ingredients)}'>Add to Shopping List</button>
    `;

    recipeContainer.appendChild(recipeElement);
  });

  document.querySelectorAll(".add-to-list").forEach((button) => {
    button.addEventListener("click", (event) => {
      const ingredients = JSON.parse(event.target.getAttribute("data-ingredients")) || [];
      addToShoppingList(ingredients);
    });
  });
}

function addToShoppingList(ingredients) {
  if (ingredients.length === 0) {
    alert("No ingredients found for this recipe!");
    return;
  }
  
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  shoppingList.push(...ingredients);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  loadShoppingList();
}

function loadShoppingList() {
  const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  
  if (shoppingList.length === 0) {
    shoppingItems.innerHTML = "<li>Your shopping list is empty</li>";
  } else {
    shoppingItems.innerHTML = shoppingList.map(item => `
      <li>
        <span>${item}</span>
        <button class="remove-item" data-item="${item}">✕</button>
      </li>
    `).join('');

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (e) => {
        const itemToRemove = e.target.getAttribute("data-item");
        removeFromShoppingList(itemToRemove);
      });
    });
  }
}

function removeFromShoppingList(item) {
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  shoppingList = shoppingList.filter(listItem => listItem !== item);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  loadShoppingList();
}