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
        let endpoint;
        const username = sessionStorage.getItem("username"); // Logged-in user's username
        const isAdmin = sessionStorage.getItem("isAdmin") === "true"; // Checking if the user is an admin
        const isLoggedIn = Boolean(username); // Checking if a user is logged in

        // Determining the endpoint based on the filter type
        if (currentFilter === "myProjects") {
            endpoint = "http://localhost:8080/api/project/personal";
        } else if (currentFilter === "Pending" && isAdmin) {
            endpoint = "http://localhost:8080/api/project/all/PENDING";
        } else {
            endpoint = "http://localhost:8080/api/project/all";
        }

        // Fetching projects from the endpoint
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch projects.");

        const projects = await response.json();

        // Applying filtering logic based on user role and filter type
        let filteredProjects;

        if (isAdmin) {
            // Admin behavior
            if (currentFilter === "Pending") {
                // Displaying only pending projects in "Pending Verification"
                filteredProjects = projects.filter(project => project.status === "PENDING");
            } else {
                // Displaying all projects (Active, Pending, Stopped, Completed) in "All Projects"
                filteredProjects = projects;
            }
        } else if (isLoggedIn) {
            // User behavior
            if (currentFilter === "myProjects") {
                // Displaying all projects created by the user in "My Projects"
                filteredProjects = projects.filter(project => project.organizer.username === username);
            } else {
                // Displaying only Active, Stopped, and Completed projects in "All Projects"
                filteredProjects = projects.filter(
                    project => project.status === "ACTIVE" || project.status === "STOPPED" || project.status === "COMPLETED"
                );
            }
        } else {
            // For non-logged-in users, display all projects (fallback behavior)
            filteredProjects = projects.filter(project => project.status === "ACTIVE");
        }

        // Calculating pagination
        const startIndex = (currPage - 1) * projectsPerPage;
        const endIndex = currPage * projectsPerPage;

        // Cleaning the container and pagination
        container.innerHTML = "";
        pagination.innerHTML = "";

        // Getting the projects to display on the current page
        const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);

        // Populating the project cards
        projectsToDisplay.forEach(project => {
            const projectCard = template.cloneNode(true);

            // Populating the template with project data
            const imageElement = projectCard.querySelector(".card-img-top");
            if(project.image) {
                imageElement.src = `data:image/png;base64,${project.image}`;
            }else {
                imageElement.src = "/src/main/resources/src (front-end)/img/favicon.png";
            }
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
            } else if (project.status === "STOPPED") {
                statusCircle.style.backgroundColor = "red";
                statusText.textContent = "Stopped";
            } else if (project.status === "COMPLETED") {
                statusCircle.style.backgroundColor = "blue";
                statusText.textContent = "Completed";
            }

            // Calculating and display the progress percentage
            const progressPercentage = (project.currentAmount / project.goalAmount) * 100;
            const progressBar = projectCard.querySelector(".progress-bar");
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.setAttribute("aria-valuenow", progressPercentage);
            projectCard.querySelector(".progress-text").textContent = `${progressPercentage.toFixed(1)}% Funded`;

            // Adding "Created by" text
            const cardBody = projectCard.querySelector(".card-body");
            const createdBy = document.createElement("p");
            createdBy.classList.add("mt-3", "text-center");
            createdBy.style.fontWeight = "bold";
            createdBy.style.color = "var(--text-color)";
            createdBy.style.textDecoration = "underline";
            createdBy.textContent = `Created by: ${project.organizer.username}`;
            cardBody.appendChild(createdBy);

            // Attaching event to the button
            const button = projectCard.querySelector("button");
            button.textContent = "Check Project's Info";
            button.onclick = () => handleSupport(project.projectID, project.status);

            // Appending the project card to the container
            container.appendChild(projectCard);
        });

        // Initializing pagination
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
    // Cleaning sessionsStorage on logout
    sessionStorage.clear();

    //Redirecting to homepage
    window.location.href = "./index.html";
}




//! --- Listeners ---

//? Filter functionality listeners
document.getElementById("filterAll").addEventListener("click", () => {
    currentFilter = "all";
    currPage = 1; // Resetting to the first page
    displayProjects();
});

document.getElementById("filterMyProjects").addEventListener("click", () => {
    currentFilter = "myProjects";
    currPage = 1; // Resetting to the first page
    displayProjects();
});

//? DOM listener
document.addEventListener("DOMContentLoaded", function () {
    // Checking if the user is logged in
    const accessToken = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";

    // Getting filter button and dropdown elements
    const filterButtonContainer = document.querySelector(".dropdown");
    const filterDropdown = document.getElementById("filterDropdown");
    const filterAll = document.getElementById("filterAll");
    const filterMyProjects = document.getElementById("filterMyProjects");

    if (!username || !accessToken) {
        // Hiding the filter button if no user is logged in
        if (filterButtonContainer) {
            filterButtonContainer.style.display = "none";
        }
    } else {
        // Showing the filter button if the user is logged in
        if (filterButtonContainer) {
            filterButtonContainer.style.display = "block";

            // Updating filter options based on user role
            if (isAdmin) {
                // Admin: Active Projects / Pending Verification
                filterAll.textContent = "All Projects";
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

    // Handling Dropdown Item Clicks
    const filterItems = document.querySelectorAll(".dropdown-item");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            // Removing 'active' class from all items
            filterItems.forEach(i => i.classList.remove("active"));

            // Adding 'active' class to the clicked item
            this.classList.add("active");

            // Updating filter logic
            const filterType = this.id;
            if (filterType === "filterAll" || filterType === "filterActive") {
                currentFilter = "all"; // Showing all projects (Active)
            } else if (filterType === "filterMyProjects") {
                currentFilter = "myProjects"; // Showing user-specific projects
            } else if (filterType === "filterPending") {
                currentFilter = "Pending"; // Showing projects pending verification
            }
            currPage = 1; // Resetting to the first page
            displayProjects(); // Refreshing the displayed projects
        });
    });

    // Handling New Project Form Submission
    const addNewForm = document.getElementById('addNewForm');
    if (addNewForm) {
        addNewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Checking if the user is logged in
            if (!username || !accessToken) {
                alert("Please log in to create a new project.");
                return;
            }

            // Collecting form data
            const imageFile = document.getElementById('projectImage').files[0];
            const title = document.getElementById('projectTitle').value.trim();
            const description = document.getElementById('projectDescription').value.trim();
            const goalAmount = parseFloat(document.getElementById('projectGoal').value);
            const deadlineForGoal = document.getElementById('projectDeadline').value;

            // Validating inputs
            if (!title || !description || !goalAmount || !deadlineForGoal) {
                alert("Please fill in all fields.");
                return;
            }

            // Encoding image (base64)
            let base64Image = null;
            if(imageFile) {
                const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
                if (imageFile.size > maxSize) {
                    alert("The selected image exceeds the maximum allowed size of 5 MB. Please upload a smaller image.");
                    return; // Stopping processing if the file is too large
                }

                // Encoding the image to Base64
                const reader = new FileReader();
                base64Image = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result.split(',')[1]); // Extracting Base64 data
                    reader.onerror = () => reject(new Error("Failed to read image file"));
                    reader.readAsDataURL(imageFile);
                });
            }

            // Converting deadline into localdatetime
            const deadlineForGoalConv = `${deadlineForGoal}T00:00:00`

            // Preparing the request body
            const newProject = {
                title,
                description,
                goalAmount,
                deadlineForGoal: deadlineForGoalConv,
                image: base64Image
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

                    // Closing the modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addNewModal'));
                    modal.hide();

                    // Resetting the form
                    addNewForm.reset();

                    // Refreshing the project display
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

    // Handling Navbar Content
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

        // Showing admin-specific buttons
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

        // Hiding admin-specific buttons
        const reportButton = document.querySelector(".custom-report-btn");
        if (reportButton) {
            reportButton.style.display = "none";
        }
    }

    // Displaying projects on page load
    displayProjects();
});
