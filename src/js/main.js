import "../style.css";

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
  recipeContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");

    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="250">
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} min</p>
      <button class="add-to-list" data-title="${recipe.title}">Add to Shopping List</button>
    `;

    recipeContainer.appendChild(recipeElement);
  });

  document.querySelectorAll(".add-to-list").forEach((button) => {
    button.addEventListener("click", (event) => {
      const recipeTitle = event.target.getAttribute("data-title");
      addToShoppingList(recipeTitle);
    });
  });
}

function addToShoppingList(item) {
  const shoppingList = document.querySelector("#shopping-items");
  const listItem = document.createElement("li");
  listItem.textContent = item;

  const removeButton = document.createElement("button");
  removeButton.textContent = "❌";
  removeButton.classList.add("remove-item");
  removeButton.addEventListener("click", () => {
    shoppingList.removeChild(listItem);
  });

  listItem.appendChild(removeButton);
  shoppingList.appendChild(listItem);
}

document.querySelector("#search").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector(".search").value.trim();
  if (query) {
    searchRecipes(query);
  }
});

async function searchRecipes(query) {
  try {
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&number=5`;
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Search error:", error);
  }
}

fetchRecipes();
