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

    // Populating the placeholders
    document.getElementById('project-image').src = project.image;
    document.getElementById('project-image').alt = project.title;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('project-collected').textContent = project.collected;
    document.getElementById('project-goal').textContent = project.goal;
    document.getElementById('project-progress-percentage').textContent = progressPercentage;
    document.getElementById('project-creator').textContent = project.username;
    document.getElementById('createdBy-Box').style.textDecoration = "underline";
    
    const progressBar = document.getElementById('project-progress-bar');
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log("All good with DOM and parsed.");
    displayProjectInfo();

    // Report Issue Form Submission
    const reportForm = document.getElementById('reportIssueForm');
    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const issueTitle = document.getElementById('issueTitle').value;
        const issueDescription = document.getElementById('issueDescription').value;

        alert(`Issue Reported:\n\nTitle: ${issueTitle}\nDescription: ${issueDescription}`);

        // Closing modal after submission
        const modal = bootstrap.Modal.getInstance(document.getElementById('reportIssueModal'));
        modal.hide();
    });
});
