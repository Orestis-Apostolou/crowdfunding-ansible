const dummyprojects = [
    {
        id: 1,
        title: "Project #1",
        description: "This is the description for project #1.",
        image: "../img/favicon.png",
        link: "#"
    },
    { 
        id: 2, 
        title: "Project #2", 
        description: "This is the description for project #2.", 
        image: "../img/favicon.png", 
        link: "#" 
    },
    { 
        id: 3, 
        title: "Project #3", 
        description: "This is the description for project #3.", 
        image: "../img/favicon.png", 
        link: "#" 
    }
];

function displayProjects() {
    const container = document.getElementById("projectsContainer");

    dummyprojects.forEach(dummyproject => {
        const card = `<div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${dummyproject.image}" class="card-img-top" alt="${dummyproject.title}">
                            <div class="card-body">
                                <h5 class="card-title">${dummyproject.title}</h5>
                                <p class="card-text">${dummyproject.description}</p>
                                <button class="btn btn-primary w-100" onclick="handleSupport('${dummyproject.title}')">Check Project</button>
                            </div>
                        </div>
                    </div>`;
        container.innerHTML += card;
    });
}

function redirectToLoginPage() {
    console.log(window.location.href);
    window.location.href = "../LoginRegister/loginRegisterPage.html";
}

function handleSupport(projectTitle) {
    alert(`Please login or register to support "${projectTitle}".`);
    redirectToLoginPage();
}

//Displaying all the projects parsed from db
displayProjects();
