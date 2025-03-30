//Not being used here, it's in main.

// function usernameTemplate(username) {
//     return `<p class="user">${username}</p>`;
// }

// function renderUsername(username) {
//     const display = document.querySelector("#username");
//     display.innerHTML = usernameTemplate(username);
// }

// function updateLocalStorage() {
//     if (currentUsername) {
//         localStorage.setItem("Shopping List" + currentUsername, JSON.stringify(savedList));
//     }
// }

// export function loadLocalStorage() {
//     if (currentUsername) {
//         const stored = localStorage.getItem("Shopping List" + currentUsername);
//         savedList = stored ? JSON.parse(stored) : [];
//         renderTasks(savedList);
//     }
// }