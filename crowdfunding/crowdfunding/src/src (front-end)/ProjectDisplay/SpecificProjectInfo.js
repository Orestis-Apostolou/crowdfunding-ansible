function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayProjectInfo() {
    const projectId = getQueryParam('id');
    if (!projectId) {
        document.getElementById('project-info').innerHTML = `<p>Project not found!</p>`;
        return;
    }

    const project = dummyprojects.find((p) => p.id === parseInt(projectId));
    if (!project) {
        document.getElementById('project-info').innerHTML = `<p>Project not found!</p>`;
        return;
    }

    const progressPercentage = Math.min((project.collected / project.goal) * 100, 500).toFixed(2);

    const projectDetails = `
        <div class="card shadow d-flex ">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h1>${project.title}</h1>
                <span>${project.description}</span>
                <p class="collected-info"><strong>Collected:</strong> $${project.collected} / $${project.goal}</p>
                <span><strong>Status:</strong> ${progressPercentage}% Funded</span>
                <div class="progress">
                    <div 
                        class="progress-bar" 
                        role="progressbar" 
                        style="width: ${progressPercentage}%;" 
                        aria-valuenow="${progressPercentage}" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                    </div>
                </div>
                <button class="mt-4" onclick="alert('Support functionality will be added!')">Support This Project</button>
            </div>
        </div>
    `;

    document.getElementById('project-info').innerHTML = projectDetails;
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log("All good with DOM and parsed.");
    displayProjectInfo();
});
