const apiKey = import.meta.env.VITE_RECIPES_API_KEY;
const baseUrl = "https://api.spoonacular.com/recipes/";

export async function searchRecipes() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  let data = {};
  const response = await fetch(
    `${baseUrl}complexSearch?apiKey=${apiKey}`,
    options
  );

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error("Response not ok");
  }

  return data.results[0];
}
