// Function to get project's ID from url
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to handle the "Report Analytics" redirection
function redirectToReports(projectId) {
    if (!projectId) {
        alert("Project ID not found.");
        return;
    }
    // Redirecting to the reports page with the project ID in the URL
    window.location.href = `../Reports/reports.html?id=${projectId}`;
}

// Function to display the project's info
async function displayProjectInfo() {
    const projectId = getQueryParam('id');

    if (!projectId) {
        document.getElementById('project-info').innerHTML = `<p>Project not found!</p>`;
        return;
    }

    try {
        // Fetching project details from the backend
        const response = await fetch(`http://localhost:8080/api/project/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project details.');

        const project = await response.json();

        // Populating project details
        const progressPercentage = Math.min(
            (project.currentAmount / project.goalAmount) * 100,
            100
        ).toFixed(2);

        // Formatting the deadline date
        const deadline = new Date(project.deadlineForGoal).toLocaleDateString();

        // Setting project details
        document.getElementById('project-image').src = "../img/favicon.png";
        document.getElementById('project-image').alt = project.title;
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('project-collected').textContent = project.currentAmount;
        document.getElementById('project-goal').textContent = project.goalAmount;
        document.getElementById('project-progress-percentage').textContent = progressPercentage;
        document.getElementById('project-creator').textContent = `${project.organizer.firstName} ${project.organizer.lastName}`;

        // Adding deadline to the UI
        const deadlineElement = document.createElement('p');
        deadlineElement.id = 'project-deadline';
        deadlineElement.classList.add('text-white', 'mt-2');
        deadlineElement.textContent = `Deadline: ${deadline}`;
        document.getElementById('project-description').insertAdjacentElement('afterend', deadlineElement);

        const progressBar = document.getElementById('project-progress-bar');
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);

        // Adding status indicator
        const statusCircle = document.createElement('span');
        statusCircle.classList.add('status-circle');
        if (project.status === 'ACTIVE') {
            statusCircle.classList.add('green');
        } else if (project.status === 'PENDING') {
            statusCircle.classList.add('orange');
        } else {
            statusCircle.classList.add('red');
        }
        document.getElementById('project-title').insertAdjacentElement('beforebegin', statusCircle);

        // Showing admin actions if the project is pending
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
        const adminActions = document.getElementById('adminActions');
        const adminReportBtn = document.getElementById('adminReportBtn');
        const reportIssueBtn = document.getElementById('reportIssueBtn');

        // General display if
        if(!(project.status === "ACTIVE")) {
            reportIssueBtn.classList.add('d-none');
        }else {
            reportIssueBtn.classList.remove('d-none');
        }

        // If cases for admin display
        if (isAdmin) {
            // Showing Admin Actions
            if (project.status === 'PENDING') {
                adminActions.classList.remove('d-none');
            } else {
                // Showing Admin Report Button
                adminReportBtn.style.display = 'block';
                adminActions.classList.add('d-none');
            }
        } else {
            // Hiding Admin-specific elements
            adminActions.classList.add('d-none');
            adminReportBtn.style.display = 'none';
        }

    } catch (error) {
        console.error('Error fetching project details:', error);
        document.getElementById('project-info').innerHTML = `<p>Failed to load project details. Please try again later.</p>`;
    }
}

// Function to approve a project
async function approveProject(projectId) {
    try {
        const response = await fetch(`http://localhost:8080/api/project/${projectId}/update-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            alert('Project approved successfully.');
            window.location.reload(); // Reloading the page to reflect the status change
        } else {
            const error = await response.json();
            alert(`Failed to approve project: ${error.message}`);
        }
    } catch (error) {
        console.error('Error approving project:', error);
        alert('An error occurred while approving the project.');
    }
}

// Function to reject a project
async function rejectProject(projectId) {

    try {
        const response = await fetch(`http://localhost:8080/api/project/${projectId}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            alert('Project rejected and deleted successfully.');
            window.location.href = '../index.html'; // Redirecting to the homepage
        } else {
            const error = await response.json();
            alert(`Failed to reject project: ${error.message}`);
        }
    } catch (error) {
        console.error('Error rejecting project:', error);
        alert('An error occurred while rejecting the project.');
    }
}

// Function to submit a report
async function submitReport(projectId, title, description) {
    try {
        const response = await fetch(`http://localhost:8080/api/report/${projectId}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,
                description
            })
        });

        if (response.ok) {
            alert('Report submitted successfully.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('reportIssueModal'));
            modal.hide();
        } else {
            const error = await response.json();
            alert(`Failed to submit report: ${error.message}`);
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        alert('An error occurred while submitting the report.');
    }
}

//? DOM listener
document.addEventListener('DOMContentLoaded', () => {
    displayProjectInfo();

    // Admin action buttons
    const approveBtn = document.getElementById('approveProjectBtn');
    const rejectBtn = document.getElementById('rejectProjectBtn');

    // Approve button click handler
    approveBtn.addEventListener('click', () => {
        const projectId = getQueryParam('id');
        if (projectId) {
            approveProject(projectId); // Calling the approveProject function
        } else {
            alert('Project ID not found.');
        }
    });

    // Reject button click handler
    rejectBtn.addEventListener('click', () => {
        const projectId = getQueryParam('id');
        if (projectId) {
            rejectProject(projectId); // Calling the rejectProject function
        } else {
            alert('Project ID not found.');
        }
    });

    // Tooltip functionality for report issue button
    const reportBtn = document.getElementById('reportIssueBtn');
    const tooltip = document.getElementById('reportIssueTooltip');
    const reportAnalyticsBtn = document.getElementById('adminReportBtn');

    // Report Analytics button handler
    reportAnalyticsBtn.addEventListener("click", () => {
        const projectId = getQueryParam("id");
        redirectToReports(projectId);
    });

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

        const projectId = getQueryParam('id');
        const issueTitle = document.getElementById('issueTitle').value;
        const issueDescription = document.getElementById('issueDescription').value;

        if(!projectId) {
            alert('Project ID not found.');
            return;
        }

        submitReport(projectId, issueTitle, issueDescription);
        modal.hide();
    });
});
