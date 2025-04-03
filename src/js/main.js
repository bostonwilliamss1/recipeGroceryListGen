// ==== Imports ====
import "../style.css";
import "../css/style.css";

// ==== Constants ====
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `${import.meta.env.VITE_API_URL}&apiKey=${API_KEY}`;
const recipeContainer = document.querySelector("#recipe-container");

// ==== Fetch & Display Recipes ====

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error fetching the recipes:", error);

    if (recipeContainer) {
      recipeContainer.innerHTML = `
        <div class="error-message">
          <h2>😢 Oops! Something went wrong.</h2>
          <p>We couldn't load recipes from the API. Please try again later.</p>
        </div>
      `;
    }
  }
}

function displayRecipes(recipes) {
  const recipeContainer = document.querySelector("#recipe-container");
  if (!recipeContainer) {
    console.warn("⚠️ #recipe-container not found. Skipping render.");
    return;
  }

  recipeContainer.innerHTML = "";

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

// ==== Shopping List Management ====

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

  let savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  const originals = ingredients.map((ing) => ing.original);
  savedList.push(...originals);
  localStorage.setItem("shoppingList", JSON.stringify(savedList));
}

function removeFromLocalStorage(item) {
  let savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  savedList = savedList.filter((i) => i !== item);
  localStorage.setItem("shoppingList", JSON.stringify(savedList));
}

function loadShoppingList() {
  const shoppingList = document.querySelector("#shopping-items");
  if (!shoppingList) return;

  const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  savedList.forEach((item) => {
    const listItem = document.createElement("li");

    const removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.classList.add("remove-item");
    removeButton.addEventListener("click", () => {
      shoppingList.removeChild(listItem);
      removeFromLocalStorage(item);
    });

    listItem.appendChild(document.createTextNode(item));
    listItem.appendChild(removeButton);
    shoppingList.appendChild(listItem);
  });
}

function updateLocalStorage() {
  if (currentUsername) {
    localStorage.setItem(
      "Shopping List" + currentUsername,
      JSON.stringify(shoppingList)
    );
  }
}

// ==== Search ====

const searchForm = document.querySelector("#search");

if (searchForm) {
  searchForm.addEventListener("submit", async (event) => {
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
}

document.getElementById("search").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector(".search").value.trim();
  if (query) {
    window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
  }
});

// ==== Hamburger Menu Toggle ====

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const hamburgerMenu = document.getElementById("hamburgerMenu");

  if (hamburgerIcon && hamburgerMenu) {
    hamburgerIcon.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active");
    });
  }
});

// ==== Init on Page Load ====

function init() {
  fetchRecipes();
  hideSearchBar();

  const shoppingListContainer = document.querySelector("#shopping-items");
  if (shoppingListContainer) {
    loadShoppingList();
  }
}

document.addEventListener("DOMContentLoaded", init);
