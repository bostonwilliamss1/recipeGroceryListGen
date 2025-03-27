export function checked() {
  console.log("Checkbox clicked! Current state:", this.checked);
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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkboxList");
    checkbox.addEventListener("click", checked);

    const removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.classList.add("remove-item");
    removeButton.addEventListener("click", () => {
      shoppingList.removeChild(listItem);
      removeFromLocalStorage(item);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(item));
    listItem.appendChild(removeButton);

    shoppingList.appendChild(listItem);
  });
}

window.addEventListener("DOMContentLoaded", loadShoppingList);
