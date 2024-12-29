const dummyprojects = [
    { id: 1, title: "Project #1", description: "This is the description for project #1.", image: "../img/favicon.png", link: "#", goal: 5000, collected: 8730, username: "NikosZap" },
    { id: 2, title: "Project #2", description: "This is the description for project #2.", image: "../img/favicon.png", link: "#", goal: 7500, collected: 3150,  username: "Mhtsakos"},
    { id: 3, title: "Project #3", description: "This is the description for project #3.", image: "../img/favicon.png", link: "#", goal: 12500, collected: 2789, username: "Oratios" },
    { id: 4, title: "Project #4", description: "This is the description for project #4.", image: "../img/favicon.png", link: "#", goal: 2500, collected: 48, username: "Mhtsakos" },
    { id: 5, title: "Project #5", description: "This is the description for project #5.", image: "../img/favicon.png", link: "#", goal: 7000, collected: 3333, username: "Kypraios" },
    { id: 6, title: "Project #6", description: "This is the description for project #6.", image: "../img/favicon.png", link: "#", goal: 7000, collected: 14570, username: "Milkocup" },
    { id: 7, title: "Project #7", description: "This is the description for project #7.", image: "../img/favicon.png", link: "#", goal: 27000, collected: 18752, username: "Miltos_Kat" },
    { id: 8, title: "Project #8", description: "This is the description for project #8.", image: "../img/favicon.png", link: "#", goal: 50000, collected: 37890, username: "Alex" },
    { id: 9, title: "Project #9", description: "This is the description for project #9.", image: "../img/favicon.png", link: "#", goal: 12500, collected: 12490, username: "Sia" }
];

const dummyUsers = {
    admin: { username: "Admin", email: "admin@localhost.com", password: "admin123@", role: "admin" },
    user: { username: "User", email: "user@localhost.com", password: "user123@", role: "user"}
};

// let currUser = JSON.parse(sessionStorage.getItem('currUser')) || null;
let currPage = 1;
const projectsPerPage = 3;

// Function to check login credentials and log the user in
// function checkLoginCredentials(event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // Check if the credentials match any of the existing profiles
//     const user = Object.values(dummyUsers).find(user => user.email === email && user.password === password);

//     if (user) {
//         // Store user data in sessionStorage for persistent login   
//         sessionStorage.setItem('currUser', JSON.stringify(user));
//         currUser = user;

//         window.location.href = "../MainApp/index.html";
//     } else {
//         // If login fails, show an error message
//         alert("Invalid email or password. Please try again.");
//     }
// }

// document.getElementById('loginForm').addEventListener('submit', checkLoginCredentials);

// Function to display all the projects that are currently hosted on DS_crowdfunding app
function displayProjects() {
    const container = document.getElementById("projectsContainer");
    const pagination = document.getElementById("pagination");
    const template = document.getElementById("projectCardTemplate").content;

    // Calculating the start and the end index for the current page
    const startIndex = (currPage - 1) * projectsPerPage;
    const endIndex = currPage * projectsPerPage;

    // Clearing the container and pagination
    container.innerHTML = "";
    pagination.innerHTML = "";

    // Displaying the projects for the current page
    const projectsToDisplay = dummyprojects.slice(startIndex, endIndex);
    projectsToDisplay.forEach(dummyproject => {
        const projectCard = template.cloneNode(true);

        // Populating the template with dynamic data
        projectCard.querySelector(".card-img-top").src = dummyproject.image;
        projectCard.querySelector(".card-img-top").alt = dummyproject.title;
        projectCard.querySelector(".card-title").textContent = dummyproject.title;

        const progressPercentage = (dummyproject.collected / dummyproject.goal) * 100;
        const progressBar = projectCard.querySelector(".progress-bar");
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute("aria-valuenow", progressPercentage);
        projectCard.querySelector(".progress-text").textContent = `${progressPercentage.toFixed(1)}% Funded`;
        
        // Adding the Created by: {username} field
        const cardBody = projectCard.querySelector(".card-body");
        const createdBy = document.createElement("p");
        createdBy.classList.add("mt-3", "text-center");
        createdBy.style.fontWeight = "bold";
        createdBy.style.color = "var(--text-color)";
        createdBy.style.textDecoration = "underline";

        createdBy.textContent = `Created by: ${dummyproject.username}`;
        cardBody.appendChild(createdBy);

        const button = projectCard.querySelector("button");
        button.onclick = () => handleSupport(dummyproject.id);

        // Appending to the page the populated card to the container
        container.appendChild(projectCard);
    });

    paginationInitialization(pagination);
}

function paginationInitialization(pagination) {
    // Calculating the total number of pages exist
    const totalPages = Math.ceil(dummyprojects.length / projectsPerPage);

    // Creating pagination items (Boostrap)
    const ul = document.createElement("ul");
    ul.classList.add("pagination");

    // Previous button {Logic}
    const prevItem = document.createElement("li");
    prevItem.classList.add("page-item");
    if (currPage === 1) {
        prevItem.classList.add("disabled");
    }

    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.href = "#";
    prevLink.textContent = "Previous";
    prevLink.onclick = () => goToPage(currPage - 1);
    prevItem.appendChild(prevLink);
    ul.appendChild(prevItem);

    // Page number {buttons}
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        if (i === currPage) {
            pageItem.classList.add("active");
        }

        const pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.onclick = () => goToPage(i);
        pageItem.appendChild(pageLink);

        ul.appendChild(pageItem);
    }

    // Next button {Logic}
    const nextItem = document.createElement("li");
    nextItem.classList.add("page-item");
    if (currPage === totalPages) {
        nextItem.classList.add("disabled");
    }

    const nextLink = document.createElement("a");
    nextLink.classList.add("page-link");
    nextLink.href = "#";
    nextLink.textContent = "Next";
    nextLink.onclick = () => goToPage(currPage + 1);
    nextItem.appendChild(nextLink);
    ul.appendChild(nextItem);

    // Adding the pagination to the page
    pagination.appendChild(ul);
}

function goToPage(page) {
    if(page < 1 || page > Math.ceil(dummyprojects.length / projectsPerPage)) {
        return;
    }

    currPage = page;
    // console.log("Navigation to page: ", currPage);
    displayProjects();
}

function redirectToLoginPage() {
    // console.log(window.location.href);
    window.location.href = "../LoginRegister/loginRegister.html";
}

function redirectToHomePage() {
    // console.log(window.location.href);
    window.location.href = "../MainApp/index.html";
}

function handleSupport(projectID) {
    // alert(`Please login or register to support "${projectTitle}".`);
    // if(!currUser) {
    //     alert("Please login to check this project's information.");
    //     return;
    // }
    window.location.href = `../ProjectDisplay/ProjectDisplay.html?id=${projectID}`;
}

// // Function to logout the current user from session
// function logout() {
//     sessionStorage.removeItem('currUser');
//     currUser = null;
//     window.location.href = "../MainApp/index.html";
// }

// // Function for admin to check projects
// function manageProjects() {
//     alert("Admin Panel: Manage your projects.");
// }

//Displaying all the projects parsed from db
displayProjects();


// Listeners for upload new project
document.getElementById('addNewButton').addEventListener('click', () => {
    const popup = document.getElementById('addNewPopup');
    popup.classList.add('visible');
});

document.getElementById('closePopupButton').addEventListener('click', () => {
    const popup = document.getElementById('addNewPopup');
    popup.classList.remove('visible');
});

// Form submission logic
document.getElementById('addNewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const goal = document.getElementById('projectGoal').value;

    console.log({ title, description, goal });
    alert('Project added successfully!');

    // Close popup and clear form
    document.getElementById('addNewPopup').classList.remove('visible');
    document.getElementById('addNewForm').reset();
});
