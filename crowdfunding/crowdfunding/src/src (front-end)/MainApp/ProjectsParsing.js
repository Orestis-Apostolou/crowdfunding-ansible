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

let currPage = 1;
const projectsPerPage = 3;

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
    console.log("Navigation to page: ", currPage);
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
    window.location.href = `../ProjectDisplay/ProjectDisplay.html?id=${projectID}`;
}

//Displaying all the projects parsed from db
displayProjects();
