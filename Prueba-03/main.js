const gameBoard = document.querySelector('.game-board')
const emojis = ['🚀', '👁️', '👨🏾‍💻', '👷🏾‍♂️', '🏠', '🫀', '🐶', '🍔'] // Emojis para las tarjetas
const numOfPairs = emojis.length

const cards = emojis.concat(emojis) // Duplica los emojis para crear pares
let flippedCards = 0
let firstCard = null
let secondCard = null
let lockBoard = false
let moves = 0
let matchedPairs = 0
let timerInterval
let seconds = 0

function createCard (emoji) {
  const card = document.createElement('div')
  card.classList.add('myCard')

  const innerCard = document.createElement('div')
  innerCard.classList.add('innerCard')

  const frontSide = document.createElement('div')
  frontSide.classList.add('frontSide')
  frontSide.textContent = '🃏'

  const backSide = document.createElement('div')
  backSide.classList.add('backSide')
  backSide.textContent = emoji // Emoji para la parte trasera de la tarjeta

  innerCard.appendChild(frontSide)
  innerCard.appendChild(backSide)
  card.appendChild(innerCard)

  card.addEventListener('click', () => {
    if (lockBoard) return
    if (card === firstCard) return

    card.classList.add('flipped')

    if (!firstCard) {
      firstCard = card
      return
    }

    secondCard = card
    moves++
    updateMoves()

    checkForMatch()
  })

  return card
}

function checkForMatch () {
  const isMatch = firstCard.querySelector('.backSide').textContent === secondCard.querySelector('.backSide').textContent

  isMatch ? disableCards() : unflipCards()
}

function disableCards () {
  firstCard.removeEventListener('click', () => {})
  secondCard.removeEventListener('click', () => {})

  flippedCards += 2
  matchedPairs++

  if (matchedPairs === numOfPairs) {
    clearInterval(timerInterval)
    displayWinMessage()
  }

  resetBoard()
}

function unflipCards () {
  lockBoard = true

  setTimeout(() => {
    firstCard.classList.remove('flipped')
    secondCard.classList.remove('flipped')

    resetBoard()
  }, 1000)
}

function resetBoard () {
  [firstCard, secondCard] = [null, null]
  lockBoard = false
}

function displayWinMessage () {
  const winMessage = document.createElement('div')
  winMessage.classList.add('win-message')
  winMessage.textContent = `¡Has ganado en ${moves} movimientos y ${seconds} segundos!`

  gameBoard.appendChild(winMessage)
}

function updateMoves () {
  const movesElement = document.querySelector('.moves')
  movesElement.textContent = `Movimientos: ${moves}`
}

function startTimer () {
  const timerElement = document.querySelector('.timer')
  timerInterval = setInterval(() => {
    seconds++
    timerElement.textContent = `Tiempo: ${seconds} s`
  }, 1000)
}

cards.sort(() => Math.random() - 0.5) // Baraja las tarjetas aleatoriamente

cards.forEach(emoji => {
  const cardElement = createCard(emoji)
  gameBoard.appendChild(cardElement)
})

updateMoves()
startTimer()
