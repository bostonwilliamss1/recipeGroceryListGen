import "../style.css";
import "../css/style.css";
import { bannerTemplate, randomImage } from "./banner.mjs";
import { hideSearchBar } from "./header.mjs";
import { searchRecipes as fetchRecipesFromAPI } from "./recipesApi.mjs";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `${import.meta.env.VITE_API_URL}&apiKey=${API_KEY}`;

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error fetching the recipes:", error);
  }
}

function displayRecipes(recipes) {
  const recipeContainer = document.querySelector("#recipe-container");
  recipeContainer.innerHTML = ""; // Clear previous results

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");

    const ingredientsList = recipe.extendedIngredients
      ? recipe.extendedIngredients.map((ing) => ing.original).join(", ")
      : "No ingredients available";

    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} min</p>
      <button class="add-to-list" data-ingredients='${JSON.stringify(
        recipe.extendedIngredients
      )}'>Add to Shopping List</button>
    `;

    recipeContainer.appendChild(recipeElement);
  });

  document.querySelectorAll(".add-to-list").forEach((button) => {
    button.addEventListener("click", (event) => {
      const ingredients = JSON.parse(
        event.target.getAttribute("data-ingredients")
      );
      addToShoppingList(ingredients);
    });
  });
}

function addToShoppingList(ingredients) {
  const shoppingList = document.querySelector("#shopping-items");

  ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient.original;

    const removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.classList.add("remove-item");
    removeButton.addEventListener("click", () => {
      shoppingList.removeChild(listItem);
    });

    listItem.appendChild(removeButton);
    shoppingList.appendChild(listItem);
  });
}

document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = document.querySelector(".search").value.trim();
  if (query) {
    try {
      const data = await fetchRecipesFromAPI(query);
      displayRecipes(data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  }
});

async function init() {
  await fetchRecipes();
  const defaultRecipes = await fetchRecipesFromAPI("chicken"); // Provide a default query
  displayRecipes(defaultRecipes.results);
  hideSearchBar();
}

document.addEventListener("DOMContentLoaded", init);
