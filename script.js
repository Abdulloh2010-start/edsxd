const api = "https://randomuser.me/api/?results=100";
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");
const changeSelecet = document.getElementById("changeSelecet");
const loader = document.getElementById("loader");
let allUsers = [];
async function fetchUsers() {
    try {
        loader.style.display = "block";
        const response = await fetch(api);
        const data = await response.json();
        allUsers = data.results;
        renderUsers();
    } catch (error) {
        console.log("Xatolik", error);
    } finally {
        loader.style.display = "none";
    };
}
function renderUsers() {
    let filteredUsers = [...allUsers];

    if (changeSelecet.value === "Ism") {
        filteredUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (changeSelecet.value === "yosh") {
        filteredUsers.sort((a, b) => a.dob.age - b.dob.age);
    }

    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
        user.name.first.toLowerCase().includes(searchTerm) ||
        user.name.last.toLowerCase().includes(searchTerm)
    );

    usersContainer.innerHTML = "";
    filteredUsers.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="img" src="${user.picture.large}" alt="${user.name.first}">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>${user.location.city}</p>
            <p>${user.location.country}</p>
            <p>${user.phone}</p>
            <p>${user.dob.age}</p>
            <p>${user.email}</p>    
        `;
        usersContainer.appendChild(card);
    });
}

changeSelecet.addEventListener("change", renderUsers);
searchInput.addEventListener("input", renderUsers);
fetchUsers();