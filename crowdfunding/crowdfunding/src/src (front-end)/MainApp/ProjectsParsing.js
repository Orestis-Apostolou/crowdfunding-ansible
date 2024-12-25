const dummyprojects = [
    {
        id: 1,
        title: "Project #1",
        description: "This is the description for project #1.",
        image: "../img/favicon.png",
        link: "#",
        goal: 5000,
        collected: 8730
    },
    { 
        id: 2, 
        title: "Project #2", 
        description: "This is the description for project #2.", 
        image: "../img/favicon.png", 
        link: "#", 
        goal: 7500,
        collected: 3150
    },
    { 
        id: 3, 
        title: "Project #3", 
        description: "This is the description for project #3.", 
        image: "../img/favicon.png", 
        link: "#",
        goal: 12500,
        collected: 2789
    },
    {
        id: 4,
        title: "Project #4",
        description: "This is the description for project #4.",
        image: "../img/favicon.png",
        link: "#",
        goal: 2500,
        collected: 48
    },
    { 
        id: 5, 
        title: "Project #5", 
        description: "This is the description for project #5.", 
        image: "../img/favicon.png", 
        link: "#",
        goal: 7000,
        collected: 3333
    },
    { 
        id: 6, 
        title: "Project #6", 
        description: "This is the description for project #6.", 
        image: "../img/favicon.png", 
        link: "#",
        goal: 7000,
        collected: 14570
    },
    {
        id: 7,
        title: "Project #7",
        description: "This is the description for project #7.",
        image: "../img/favicon.png",
        link: "#",
        goal: 27000,
        collected: 18752
    },
    { 
        id: 8, 
        title: "Project #8", 
        description: "This is the description for project #8.", 
        image: "../img/favicon.png", 
        link: "#",
        goal: 50000,
        collected: 37890
    },
    { 
        id: 9, 
        title: "Project #9", 
        description: "This is the description for project #9.", 
        image: "../img/favicon.png", 
        link: "#",
        goal: 12500,
        collected: 12490
    }
];

let currPage = 1;
const projectsPerPage = 3;

function displayProjects() {
    const container = document.getElementById("projectsContainer");
    const pagination = document.getElementById("pagination");

    // Calculating the starting and ending index for the curr page
    const startIndex = (currPage - 1) * projectsPerPage;
    const endIndex = currPage * projectsPerPage;

    // Cleaning the container and pagination buttons
    container.innerHTML = "";
    pagination.innerHTML = "";

    // Displaying the projects for the curr page
    const projectsToDisplay = dummyprojects.slice(startIndex, endIndex);
    projectsToDisplay.forEach(dummyproject => {
        const progressPercentage = (dummyproject.collected / dummyproject.goal) * 100;
        const card = `<div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${dummyproject.image}" class="card-img-top" alt="${dummyproject.title}">
                            <div class="card-body">
                                <h5 class="card-title">${dummyproject.title}</h5>
                                <p class="card-text">${dummyproject.description}</p>

                                <!-- Goal / Progress Bar -->
                                <div class="mt-3">
                                    <p class="collected-info"><strong>Collected: $${dummyproject.collected} / $${dummyproject.goal}</strong></p>
                                    
                                    <div class="progress" style="height: 15px;">
                                        <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    
                                    <p class="text-center mt-2 progress-text">${progressPercentage.toFixed(1)}% Funded</p>
                                </div>

                                <button class="btn btn-primary w-100" onclick="handleSupport('${dummyproject.title}')">Check Project</button>
                            </div>
                        </div>
                    </div>`;
        container.innerHTML += card;
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

function handleSupport(projectTitle) {
    alert(`Please login or register to support "${projectTitle}".`);
    redirectToLoginPage();
}

//Displaying all the projects parsed from db
displayProjects();
