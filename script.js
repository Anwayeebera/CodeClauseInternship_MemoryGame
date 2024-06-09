document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameContainer = document.getElementById('game-container');
    const gameBoard = document.getElementById('game-board');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    const winMessage = document.getElementById('win-message');
    const startButton = document.getElementById('start-button');
    const playAgainButton = document.getElementById('play-again-button');

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let flippedCards = 0;
    let score = 0;
    let time = 0;
    let timerInterval;

    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍓', '🍑'];
    const cardSymbols = [...symbols, ...symbols];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        time = 0;
        score = 0;
        flippedCards = 0;
        firstCard = null;
        secondCard = null;
        timeDisplay.textContent = time;
        scoreDisplay.textContent = score;
        gameBoard.innerHTML = '';
        winMessage.style.display = 'none';
        shuffle(cardSymbols);

        cards = cardSymbols.map((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            return card;
        });

        timerInterval = setInterval(() => {
            time++;
            timeDisplay.textContent = time;
        }, 1000);
    }

    function flipCard() {
        if (firstCard && secondCard) return;
        if (this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.symbol;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    function checkMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            score++;
            scoreDisplay.textContent = score;
            flippedCards += 2;
            resetCards();
            if (flippedCards === cards.length) {
                clearInterval(timerInterval);
                winMessage.style.display = 'flex';
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.classList.remove('flipped');
                secondCard.textContent = '';
                resetCards();
            }, 1000);
        }
    }

    function resetCards() {
        firstCard = null;
        secondCard = null;
    }

    startButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
        startGame();
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        startGame();
    });

    playAgainButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        startGame();
    });

    // Initial display setup
    gameContainer.style.display = 'none';
    winMessage.style.display = 'none';
});
