const apiKey = import.meta.env.RECIPES-API-KEY;
const baseUrl = "https://api.spoonacular.com/recipes/";

export async function searchRecipes() {
    const option = {
        method: "GET",
        header: {
            "X-Api-Key": apiKey
        }
    };
    let data = {}
    const response = await fetch(baseUrl + "complexSearch", option);
    if (response.ok) {
        data = await response.json();
    } else throw new Error("response not ok");
    return data.data[0];
}

