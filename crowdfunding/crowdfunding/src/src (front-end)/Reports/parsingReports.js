const dummyReports = [
    { id: 1, subject: "Issue with payment", content: "I couldn't process my payment.", username: "NikosZap" },
    { id: 2, subject: "Project not updated", content: "The project status hasn't been updated for weeks.", username: "Mhtsakos" },
    { id: 3, subject: "Bug in donation flow", content: "There is a bug in the donation flow causing a crash.", username: "Oratios" },
    { id: 4, subject: "Login error", content: "I can't log in to my account. It shows an invalid password error.", username: "Kypraios" },
    { id: 5, subject: "Missing donation history", content: "The donation history is not showing for my profile.", username: "Kypraios" },
    { id: 6, subject: "Slow website performance", content: "The website takes too long to load, especially on mobile.", username: "Sia" },
    { id: 7, subject: "No email confirmation", content: "I haven't received any email confirmation after making a donation.", username: "MilkoCup" },
    { id: 8, subject: "Error with project submission", content: "I can't submit my project details due to an error on the form.", username: "Miltos" },
    { id: 9, subject: "Payment gateway issues", content: "Payment fails every time I try to donate via PayPal.", username: "Alex" },
    { id: 10, subject: "Missing campaign details", content: "The campaign details are missing important information like the target amount.", username: "Moderator" }
];

const accordion = document.getElementById("reportsAccordion");

// Looping through the reports and creating the accordion items
dummyReports.forEach(report => {
    const item = document.createElement("div");
    item.classList.add("accordion-item");
    item.innerHTML = `
        <h2 class="accordion-header" id="heading${report.id}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${report.id}" aria-expanded="false" aria-controls="collapse${report.id}">
                <strong>${report.subject}</strong> - Reported By: ${report.username}
            </button>
        </h2>
        <div id="collapse${report.id}" class="accordion-collapse collapse" aria-labelledby="heading${report.id}" data-bs-parent="#reportsAccordion">
            <div class="accordion-body">
                ${report.content}
            </div>
        </div>
    `;
    accordion.appendChild(item);
});
