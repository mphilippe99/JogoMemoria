const cartas = document.querySelectorAll('.carta-memoria');

let hasFlippedCarta = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCarta() {
    if(lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCarta) {
        // first click
        hasFlippedCarta = true;
        firstCard = this; 

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === 
    secondCard.dataset.framework; 
     

    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventlistener('click', flipCarta);
    secondCard.removeEventlistener('click', flipCarta);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCarta, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cartas.forEach(carta => {
        let randomPos = Math.floor(Math.random() * 12);
        carta.style.order = randomPos;
    });
})();

cartas.forEach(carta => carta.addEventListener('click', flipCarta));
