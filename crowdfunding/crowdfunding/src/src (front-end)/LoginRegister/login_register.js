document.querySelectorAll('.flip-button').forEach(button => {
    button.addEventListener('click', () => {
        const cardFlip = document.querySelector('.card-flip');
        cardFlip.classList.toggle('flipped');
    });
});
