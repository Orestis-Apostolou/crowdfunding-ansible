const dummyprojects = [
    { id: 1, title: "Project #1", description: "This is the description for project #1.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 5000, collected: 8730, username: "NikosZap", status: "Active" },
    { id: 2, title: "Project #2", description: "This is the description for project #2.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 7500, collected: 3150,  username: "Mhtsakos", status: "Pending"},
    { id: 3, title: "Project #3", description: "This is the description for project #3.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 12500, collected: 2789, username: "Oratios", status: "Active" },
    { id: 4, title: "Project #4", description: "This is the description for project #4.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 2500, collected: 48, username: "Mhtsakos", status: "Pending" },
    { id: 5, title: "Project #5", description: "This is the description for project #5.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 7000, collected: 3333, username: "Kypraios", status: "Active" },
    { id: 6, title: "Project #6", description: "This is the description for project #6.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 7000, collected: 14570, username: "Milkocup", status: "Active" },
    { id: 7, title: "Project #7", description: "This is the description for project #7.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 27000, collected: 18752, username: "Miltos_Kat", status: "Pending" },
    { id: 8, title: "Project #8", description: "This is the description for project #8.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 50000, collected: 37890, username: "Alex", status: "Pending" },
    { id: 9, title: "Project #9", description: "This is the description for project #9.", image: "/src/main/resources/src (front-end)/img/favicon.png", link: "#", goal: 12500, collected: 12490, username: "Sia", status: "Active" }
];

// const dummyUsers = {
//     admin: { username: "Admin", email: "admin@localhost.com", password: "admin123@", role: "admin" },
//     user: { username: "User", email: "user@localhost.com", password: "user123@", role: "user"}
// };

// let currUser = JSON.parse(sessionStorage.getItem('currUser')) || null;

//? Globals for pagination and filter usage
let currentFilter = "all";
let currPage = 1;
const projectsPerPage = 3;

//? Function to display all the projects that are currently hosted on DS_crowdfunding app
function displayProjects() {
    const container = document.getElementById("projectsContainer");
    const pagination = document.getElementById("pagination");
    const template = document.getElementById("projectCardTemplate").content;

    // Filtering projects based on the active filter
    let filteredProjects = currentFilter === "all" ? dummyprojects : dummyprojects.filter(project => project.status === "Pending");

    // Calculating start and end indexes for pagination
    const startIndex = (currPage - 1) * projectsPerPage;
    const endIndex = currPage * projectsPerPage;

    // Cleaning container and pagination
    container.innerHTML = "";
    pagination.innerHTML = "";

    // Displaying filtered projects for the current page
    const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);
    projectsToDisplay.forEach(dummyproject => {
        const projectCard = template.cloneNode(true);

        // Populating template with data
        projectCard.querySelector(".card-img-top").src = dummyproject.image;
        projectCard.querySelector(".card-img-top").alt = dummyproject.title;
        projectCard.querySelector(".card-title").textContent = dummyproject.title;

        // Adding status circle color-based on project's status
        const statusCircle = projectCard.querySelector(".status-circle");
        const statusText = projectCard.querySelector('.status-text');
        if(dummyproject.status === "Active") {
            statusCircle.classList.add("green");
            statusText.textContent = 'Active';
        }else if(dummyproject.status === "Pending") {
            statusCircle.classList.add("orange");
            statusText.textContent = 'Pending';
        }

        const progressPercentage = (dummyproject.collected / dummyproject.goal) * 100;
        const progressBar = projectCard.querySelector(".progress-bar");
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute("aria-valuenow", progressPercentage);
        projectCard.querySelector(".progress-text").textContent = `${progressPercentage.toFixed(1)}% Funded`;

        const cardBody = projectCard.querySelector(".card-body");
        const createdBy = document.createElement("p");
        createdBy.classList.add("mt-3", "text-center");
        createdBy.style.fontWeight = "bold";
        createdBy.style.color = "var(--text-color)";
        createdBy.style.textDecoration = "underline";
        createdBy.textContent = `Created by: ${dummyproject.username}`;
        cardBody.appendChild(createdBy);

        const button = projectCard.querySelector("button");
        button.onclick = () => handleSupport(dummyproject.id, dummyproject.status);

        container.appendChild(projectCard);
    });

    paginationInitialization(pagination, filteredProjects.length);
}

//? Pagination Function
function paginationInitialization(pagination, totalProjects) {
    // Calculating the total number of pages based on the filtered projects
    const totalPages = Math.ceil(totalProjects / projectsPerPage);

    // Creating pagination items (Bootstrap)
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
    prevLink.onclick = (e) => {
        e.preventDefault();
        goToPage(currPage - 1);
    };
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
        pageLink.onclick = (e) => {
            e.preventDefault();
            goToPage(i);
        };
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
    nextLink.onclick = (e) => {
        e.preventDefault();
        goToPage(currPage + 1);
    };
    nextItem.appendChild(nextLink);
    ul.appendChild(nextItem);

    // Adding the pagination to the page
    pagination.appendChild(ul);
}

function goToPage(page) {
    const filteredProjects = currentFilter === "all" ? dummyprojects : dummyprojects.filter(project => project.status === "Pending");
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    if (page < 1 || page > totalPages) return;

    currPage = page;
    displayProjects();

    // console.log("Navigation to page: ", currPage);
}

//? handlingSupport function for specific's project information page
function handleSupport(projectID, projectStatus) {
    window.location.href = `./ProjectDisplay/project_display.html?id=${projectID}&status=${projectStatus}`;
}




//! --- Listeners ---

//? Filter functionality listeners
document.getElementById("filterAll").addEventListener("click", () => {
    currentFilter = "all";
    currPage = 1; // Reseting to the first page
    displayProjects();
});

document.getElementById("filterMyProjects").addEventListener("click", () => {
    currentFilter = "myProjects";
    currPage = 1; // Reseting to the first page
    displayProjects();
});

document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll(".dropdown-item");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            // Removing 'active' class from all items
            filterItems.forEach(i => i.classList.remove("active"));

            // Adding 'active' class to the clicked item
            this.classList.add("active");

            // Performing any action based on the selection
            const filterType = this.id;
            console.log(`Selected filter: ${filterType}`);
        });
    });
});

//? Listener for uploading new project
document.addEventListener("DOMContentLoaded", () => {
    // Adding new project form submission
    const addNewForm = document.getElementById('addNewForm');
    addNewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;
        const goal = document.getElementById('projectGoal').value;

        alert(`Project Added:\n\nTitle: ${title}\nDescription: ${description}\nGoal: ${goal}`);

        // Closing the modal after user submission
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNewModal'));
        modal.hide();

        // Cleaning the form after sub
        addNewForm.reset();
    });
});

//? Displaying all the projects parsed from db on load
displayProjects();
