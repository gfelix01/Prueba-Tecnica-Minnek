const emojisEasy = ['🚀', '👁️', '👨🏾‍💻'];
const emojisMedium = ['🚀', '👁️', '👨🏾‍💻', '👷🏾‍♂️', '🏠'];
const emojisHard = ['🚀', '👁️', '👨🏾‍💻', '👷🏾‍♂️', '🏠', '🫀', '🐶', '🍔'];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let timerInterval;
let seconds = 0;

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
function checkForMatch() {
  const selectedCards = document.querySelectorAll('.flipped');

  if (selectedCards.length === 2) {
      lockBoard = true; // Bloquea el tablero mientras se están evaluando las cartas

      const [firstCard, secondCard] = selectedCards;

      const firstEmoji = firstCard.querySelector('.backSide').textContent;
      const secondEmoji = secondCard.querySelector('.backSide').textContent;

      if (firstEmoji === secondEmoji) {
          disableCards(firstCard, secondCard);
      } else {
          setTimeout(() => {
              unflipCards(firstCard, secondCard);
          }, 1000); // Retrasa el volteo de las cartas no coincidentes
      }
  }
}


function disableCards(firstCard, secondCard) {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);

  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  matchedPairs += 2;
  moves++;

  if (matchedPairs === cards.length) {
      clearInterval(timerInterval);
      displayWinMessage();
  }

  resetBoard();
}

function handleCardClick() {
  if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

  this.classList.add('flipped');

  if (!firstCard) {
      firstCard = this;
      return;
  }

  secondCard = this;
  moves++;
  updateMoves();

  checkForMatch();
}


function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('myCard');

    const innerCard = document.createElement('div');
    innerCard.classList.add('innerCard');

    const frontSide = document.createElement('div');
    frontSide.classList.add('frontSide');
    frontSide.textContent = '⚛️';

    const backSide = document.createElement('div');
    backSide.classList.add('backSide');
    backSide.textContent = emoji;

    innerCard.appendChild(frontSide);
    innerCard.appendChild(backSide);
    card.appendChild(innerCard);

    card.addEventListener('click', handleCardClick);

    return card;
}

function startGame(difficulty) {
    let emojis;

    if (difficulty === 'easy') {
        emojis = emojisEasy.concat(emojisEasy);
    } else if (difficulty === 'medium') {
        emojis = emojisMedium.concat(emojisMedium);
    } else if (difficulty === 'hard') {
        emojis = emojisHard.concat(emojisHard);
    }

    cards = emojis.sort(() => Math.random() - 0.5);

    initializeGame();
}

function initializeGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    cards.forEach(emoji => {
        const cardElement = createCard(emoji);
        gameBoard.appendChild(cardElement);
    });

    resetGameStats();
    updateMoves();
    startTimer();
}

function resetGameStats() {
    moves = 0;
    matchedPairs = 0;
    seconds = 0;
}

function updateMoves() {
    const movesElement = document.querySelector('.moves');
    movesElement.textContent = `Movimientos: ${moves}`;
}

function startTimer() {
    const timerElement = document.querySelector('.timer');
    timerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = `Tiempo: ${seconds} s`;
    }, 1000);
}

function displayWinMessage() {
    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.textContent = `¡Has ganado en ${moves} movimientos y ${seconds} segundos!`;

    const gameBoard = document.querySelector('.game-board');
    gameBoard.appendChild(winMessage);
}

function resetGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    resetGameStats();
    initializeGame();
}

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', initializeGame);
