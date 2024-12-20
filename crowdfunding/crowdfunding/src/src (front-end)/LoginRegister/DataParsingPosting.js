document.querySelectorAll('.flip-button').forEach(button => {
    button.addEventListener('click', () => {
        const cardFlip = document.querySelector('.card-flip');
        cardFlip.classList.toggle('flipped');
    });
});

function redirectToHomePage() {
    console.log(window.location.href);
    window.location.href = "../MainApp/index.html";
}
