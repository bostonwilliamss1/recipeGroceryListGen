// Import API url

// const bannerImg = document.querySelector(".hero-banner");
const shoppingList = document.querySelector(".shoppingList");
const recipes = document.querySelector(".recipes");

function bannerTemplate(imageUrl) {
    return `
    <img src="${imageUrl}" alt="${imageUrl}">
    `
}

function randomImage(apiData) {
    const randomIndex = Math.floor(Math.random() * apiData.images.length);
    const randomImageUrl = apiData.images[randomIndex]
    const bannerContainer = document.querySelector(".hero-banner");

    if (bannerContainer) {
        bannerContainer.innerHTML = bannerTemplate(randomImageUrl);
    } else {
        console.error('No banner container found with class of hero-banner');
    }
}

setInterval(() => randomImage(apiData), 3000);


// function shoppingListTemplate(displayIngredients) {
//     return `
//     <h2>Shopping List</h2>
//     <ul>
//         <li>${displayIngredients}</li>
//     <ul>
//     `
// }

// function recipesTemplate(apiRecipe) {
//     return `
//     <img src="${apiRecipe.image}" alt="${apiRecipe.name}"
//     <h3>${apiRecipe.name}</h3>
//     <p>${apiRecipe.description}</p>
//     `
// }

// function displayIngredients() {

// }
