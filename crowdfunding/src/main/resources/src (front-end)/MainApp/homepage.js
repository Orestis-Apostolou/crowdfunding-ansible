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
async function displayProjects() {
    const container = document.getElementById("projectsContainer");
    const pagination = document.getElementById("pagination");
    const template = document.getElementById("projectCardTemplate").content;

    try {
        // Fetching projects from the backend
        const response = await fetch("http://localhost:8080/api/project/all");
        if (!response.ok) throw new Error("Failed to fetch projects.");

        const projects = await response.json(); // Parse the response into JSON

        // Filter projects based on the current filter
        let filteredProjects = currentFilter === "all"
            ? projects
            : projects.filter(project => project.status === (currentFilter === "Pending" ? "PENDING" : "ACTIVE"));

        // Calculate pagination
        const startIndex = (currPage - 1) * projectsPerPage;
        const endIndex = currPage * projectsPerPage;

        // Clear the container and pagination
        container.innerHTML = "";
        pagination.innerHTML = "";

        // Get the projects to display on the current page
        const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);

        // Populate the project cards
        projectsToDisplay.forEach(project => {
            const projectCard = template.cloneNode(true);

            // Populate the template with project data
            projectCard.querySelector(".card-img-top").src = "/src/main/resources/src (front-end)/img/favicon.png";
            projectCard.querySelector(".card-img-top").alt = project.title;
            projectCard.querySelector(".card-title").textContent = project.title;

            // Adding status circle color based on the project's status
            const statusCircle = projectCard.querySelector(".status-circle");
            const statusText = projectCard.querySelector(".status-text");
            if (project.status === "ACTIVE") {
                statusCircle.style.backgroundColor = "green";
                statusText.textContent = "Active";
            } else if (project.status === "PENDING") {
                statusCircle.style.backgroundColor = "orange";
                statusText.textContent = "Pending";
            } else {
                statusCircle.style.backgroundColor = "red";
                statusText.textContent = "Unknown";
            }

            // Calculate and display the progress percentage
            const progressPercentage = (project.currentAmount / project.goalAmount) * 100;
            const progressBar = projectCard.querySelector(".progress-bar");
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.setAttribute("aria-valuenow", progressPercentage);
            projectCard.querySelector(".progress-text").textContent = `${progressPercentage.toFixed(1)}% Funded`;

            // Add "Created by" text
            const cardBody = projectCard.querySelector(".card-body");
            const createdBy = document.createElement("p");
            createdBy.classList.add("mt-3", "text-center");
            createdBy.style.fontWeight = "bold";
            createdBy.style.color = "var(--text-color)";
            createdBy.style.textDecoration = "underline";
            createdBy.textContent = `Created by: ${project.organizer.username}`;
            cardBody.appendChild(createdBy);

            // Attach event to the button
            const button = projectCard.querySelector("button");
            button.textContent = "Support Project";
            button.onclick = () => handleSupport(project.projectID, project.status);

            // Append the project card to the container
            container.appendChild(projectCard);
        });

        // Initialize pagination
        paginationInitialization(pagination, filteredProjects.length);
    } catch (error) {
        console.error("Error displaying projects:", error);
        alert("Failed to load projects. Please try again later.");
    }
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

//? Handling logout
function handleLogout() {
    // Clear sessionsStorage
    sessionStorage.clear();

    //Redirecting to homepage
    window.location.href = "./index.html";
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

//? DOM listener
document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const accessToken = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";

    // Get filter button and dropdown elements
    const filterButtonContainer = document.querySelector(".dropdown");
    const filterDropdown = document.getElementById("filterDropdown");
    const filterAll = document.getElementById("filterAll");
    const filterMyProjects = document.getElementById("filterMyProjects");

    if (!username || !accessToken) {
        // Hide the filter button if no user is logged in
        if (filterButtonContainer) {
            filterButtonContainer.style.display = "none";
        }
    } else {
        // Show the filter button if the user is logged in
        if (filterButtonContainer) {
            filterButtonContainer.style.display = "block";

            // Update filter options based on user role
            if (isAdmin) {
                // Admin: Active Projects / Pending Verification
                filterAll.textContent = "Active Projects";
                filterAll.id = "filterActive"; // Change ID for clarity
                filterMyProjects.textContent = "Pending Verification";
                filterMyProjects.id = "filterPending"; // Change ID for clarity
            } else {
                // User: All Projects / My Projects
                filterAll.textContent = "All Projects";
                filterAll.id = "filterAll"; // Reset ID
                filterMyProjects.textContent = "My Projects";
                filterMyProjects.id = "filterMyProjects"; // Reset ID
            }
        }
    }

    // Handle Dropdown Item Clicks
    const filterItems = document.querySelectorAll(".dropdown-item");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove 'active' class from all items
            filterItems.forEach(i => i.classList.remove("active"));

            // Add 'active' class to the clicked item
            this.classList.add("active");

            // Update filter logic
            const filterType = this.id;
            if (filterType === "filterAll" || filterType === "filterActive") {
                currentFilter = "all"; // Show all projects (Active)
            } else if (filterType === "filterMyProjects") {
                currentFilter = "myProjects"; // Show user-specific projects
            } else if (filterType === "filterPending") {
                currentFilter = "Pending"; // Show projects pending verification
            }
            currPage = 1; // Reset to the first page
            displayProjects(); // Refresh the displayed projects
        });
    });

    // Handle New Project Form Submission
    const addNewForm = document.getElementById('addNewForm');
    if (addNewForm) {
        addNewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Check if the user is logged in
            if (!username || !accessToken) {
                alert("Please log in to create a new project.");
                return;
            }

            // Collect form data
            const title = document.getElementById('projectTitle').value.trim();
            const description = document.getElementById('projectDescription').value.trim();
            const goalAmount = parseFloat(document.getElementById('projectGoal').value);
            const deadlineForGoal = document.getElementById('projectDeadline').value;

            // Validate inputs
            if (!title || !description || !goalAmount || !deadlineForGoal) {
                alert("Please fill in all fields.");
                return;
            }

            // Converting deadline into localdatetime
            const deadlineForGoalConv = `${deadlineForGoal}T00:00:00`

            // Prepare the request body
            const newProject = {
                title,
                description,
                goalAmount,
                deadlineForGoal: deadlineForGoalConv
            };

            try {
                // Sending the data to the API
                const response = await fetch('http://localhost:8080/api/project/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}` // Including the access token for authentication
                    },
                    body: JSON.stringify(newProject)
                });

                if (response.ok) {
                    alert("Project created successfully!");

                    // Close the modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addNewModal'));
                    modal.hide();

                    // Reset the form
                    addNewForm.reset();

                    // Refresh the project display
                    displayProjects();
                } else {
                    const error = await response.json();
                    alert(`Error creating project: ${error.message}`);
                }
            } catch (error) {
                console.error("Error creating project:", error);
                alert("An error occurred while creating the project.");
            }
        });
    }

    // Handle Navbar Content
    const headerRightContent = document.querySelector("#headerRightContent");

    if (accessToken && username) {
        // User is logged in
        const welcomeMessage = document.createElement("span");
        welcomeMessage.textContent = `Welcome, ${username}`;
        welcomeMessage.classList.add("text-white", "me-3");

        const logoutButton = document.createElement("button");
        logoutButton.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i>';
        logoutButton.classList.add("btn", "btn-outline-light");
        logoutButton.onclick = handleLogout;

        headerRightContent.appendChild(welcomeMessage);
        headerRightContent.appendChild(logoutButton);

        // Show admin-specific buttons
        const reportButton = document.querySelector(".custom-report-btn");
        if (isAdmin && reportButton) {
            reportButton.style.display = "block";
        }
    } else {
        // User is not logged in
        const loginRegisterButton = document.createElement("button");
        loginRegisterButton.textContent = "Login / Register";
        loginRegisterButton.classList.add("btn", "btn-outline-light");
        loginRegisterButton.onclick = () => (window.location.href = "./LoginRegister/login_register.html");

        headerRightContent.appendChild(loginRegisterButton);

        // Hide admin-specific buttons
        const reportButton = document.querySelector(".custom-report-btn");
        if (reportButton) {
            reportButton.style.display = "none";
        }
    }

    // Display projects on page load
    displayProjects();
});

