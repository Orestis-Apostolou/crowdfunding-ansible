// Function to get project's ID from url
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayProjectInfo() {
    const projectId = getQueryParam('id');
    const projectStatus = getQueryParam('status');

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
    
    // Adding the pulsating circle next to the project title
    const statusCircle = document.createElement('span');
    statusCircle.classList.add('status-circle');

    // Setting status based on progress
    if (progressPercentage >= 100) {
        statusCircle.classList.add('green'); // Fully funded
    } else if (progressPercentage > 0) {
        statusCircle.classList.add('orange'); // Pending or in-progress
    }

    document.getElementById('project-title').insertAdjacentElement('beforebegin', statusCircle);

    // Displaying the admin actions based on project status
    const adminActions = document.getElementById('adminActions');
    if(projectStatus !== "Pending") {
        adminActions.classList.add('d-none');
    }else {
        adminActions.classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayProjectInfo();

    // Admin action buttons
    const approveBtn = document.getElementById('approveProjectBtn');
    const rejectBtn = document.getElementById('rejectProjectBtn');

    approveBtn.addEventListener('click', () => {
        const projectId = getQueryParam('id');
        
        if(projectId) {
            alert(`Project with ID: ${projectId} has been successfully approved.`);
        } else {
            alert('Project ID not found.');
        }
    });

    rejectBtn.addEventListener('click', () => {
        const projectId = getQueryParam('id');

        if(projectId) {
            const reason = prompt('Enter a reason for rejecting the project:');
            
            if(reason) {
                alert(`Project with ID: ${projectId} has been rejected.\nReason given: ${reason}`);
            }
        } else {
            alert('Project ID not found');
        }
    });

    const reportBtn = document.getElementById('reportIssueBtn');
    const tooltip = document.getElementById('reportIssueTooltip');

    // Displaying tooltip on hover
    reportBtn.addEventListener('mouseenter', (event) => {
        tooltip.classList.remove('d-none');
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;
    });

    // Updating tooltip position as the mouse moves
    reportBtn.addEventListener('mousemove', (event) => {
        const offsetX = 15;
        const offsetY = -20;

        tooltip.style.left = `${event.pageX + offsetX}px`;
        tooltip.style.top = `${event.pageY + offsetY}px`;
    });

    // Hiding tooltip when mouse leaves the button
    reportBtn.addEventListener('mouseleave', () => {
        tooltip.classList.add('d-none');
    });

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
