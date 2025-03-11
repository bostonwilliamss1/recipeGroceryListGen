const searchInput = document.querySelector(".search");
const searchForm = document.querySelector("#search");

export function hideSearchBar() {
    console.log(searchInput, searchForm);
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // searchInput.classList.add("hidden");
        searchInput.classList.toggle("hidden");
    })
}
