// A list that holds all card icons from Font Awesome
let cardList = [
  'fas fa-bolt',
  'fas fa-bolt',
  'fas fa-bomb',
  'fas fa-bomb',
  'fas fa-wifi',
  'fas fa-wifi',
  'fab fa-medapps',
  'fab fa-medapps',
  'fas fa-camera-retro',
  'fas fa-camera-retro',
  'fab fa-dribbble',
  'fab fa-dribbble',
  'fas fa-hand-spock',
  'fas fa-hand-spock',
  'far fa-gem',
  'far fa-gem'
]

// Add an event handler that runs the restartGame() function when the restart button is clicked
const restartButton = document.querySelector('.restart-button')
restartButton.addEventListener('click', restartGame)

// Restart game
function restartGame (event) {
  event.preventDefault()
  const deck = document.querySelector('.deck')
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild)
  }
  shuffleCardList(cardList)
  addCardToPage(cardList)
  addEventListenerToCards()
  moveCounter = 0
  openCards = []
  const counterSpan = document.querySelector('.move-counter__text-span')
  counterSpan.innerHTML = moveCounter
  minutesLabel.innerHTML = '00'
  secondsLabel.innerHTML = '00'
  totalSeconds = 0
  clearInterval(timerInt)
  timer()
  const rating = document.querySelector('.rating')
  const starList = document.querySelector('.rating__star-list')
  rating.removeChild(starList)
  const newStarList = document.createElement('ul')
  newStarList.className = 'rating__star-list'
  newStarList.innerHTML = `
    <li class="rating__star-icon">
      <i class="fas fa-star"></i>
    </li>
    <li class="rating__star-icon">
      <i class="fas fa-star"></i>
    </li>
    <li class="rating__star-icon">
      <i class="fas fa-star"></i>
    </li>`
  rating.appendChild(newStarList)
}

// Add an event handler that runs the startGame() function when the start button is clicked
const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startGame)

// Start game
function startGame (event) {
  const allCards = document.querySelectorAll('.deck__card-container')
  if (allCards.length !== 16) {
    event.preventDefault()
    timer()
    shuffleCardList(cardList)
    addCardToPage(cardList)
    addEventListenerToCards()
  }
}

// Timer function from https://stackoverflow.com/a/5517836
const minutesLabel = document.querySelector('.timer__text-minutes')
const secondsLabel = document.querySelector('.timer__text-seconds')
let totalSeconds = 0
let timerInt
function timer () {
  timerInt = setInterval(setTime, 1000)

  function setTime () {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
  }

  function pad (val) {
    let valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }
}

// Shuffle card array from http://stackoverflow.com/a/2450976
function shuffleCardList (array) {
  let currentIndex = array.length, temporaryValue, randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

// Loop through each card and add it to the page
function addCardToPage (array) {
  const deck = document.querySelector('.deck')
  array.forEach(function (el) {
    const cardHTML = document.createElement('li')
    cardHTML.className = 'deck__card-container'
    cardHTML.innerHTML = `
        <div class="deck__card">
          <figure class="deck__card--front"></figure>
          <figure class="deck__card--back"><i class="${el}"></i></figure>
        </div>`
    deck.appendChild(cardHTML)
  })
}

// Loop through each card and add an event listener to each one
function addEventListenerToCards () {
  const cards = document.querySelectorAll('.deck__card--front')
  cards.forEach(function (el) {
    el.addEventListener('click', ifCardIsClicked)
  })
}

// This function runs each time a card is cliked
let pairCheckCounter = 0
let cardClickActive = true
function ifCardIsClicked (event) {
  if (cardClickActive) {
    pairCheckCounter += 1
    flipCard(event)
    openCardList(event)
    checkCardMatch(event) // Only set to run when pairCheckCounter is on an even number
  }
}

// Add the flipped class to any tile that's clicked
function flipCard (event) {
  event.target.parentNode.classList.add('flipped')
}

// Adds cards to an open card array
let openCards = []
function openCardList (event) {
  const cardClass = event.target.nextElementSibling
  openCards.push(cardClass)
}

// Checks if the cards match
function checkCardMatch (event) {
  if (pairCheckCounter % 2 === 0) { // Only runs on even cards/pairs
    let openCard1 = openCards[openCards.length - 1].childNodes[0].classList.item(1) // Gets the Font Awesome class, example: fa-gem
    let openCard2 = openCards[openCards.length - 2].childNodes[0].classList.item(1)
    if (openCard1 === openCard2) {
      doMatch(event)
    } else if (openCard1 !== openCard2) {
      dontMatch(event)
    }
    setTimeout(function () {
      checkWin()
    }, 2000)
  }
}

// Runs if the cards are matched
function doMatch (event) {
  cardClickActive = false
  // Remove click event handler from the last two cards in the openCards array
  openCards[openCards.length - 1].previousElementSibling.removeEventListener('click', ifCardIsClicked)
  openCards[openCards.length - 2].previousElementSibling.removeEventListener('click', ifCardIsClicked)
  setTimeout(function () {
    // Animate and turn background green for the last two cards in the openCards array
    openCards[openCards.length - 1].parentNode.parentNode.classList.add('animated', 'bounce')
    openCards[openCards.length - 2].parentNode.parentNode.classList.add('animated', 'bounce')
    openCards[openCards.length - 1].style.backgroundColor = '#008a00'
    openCards[openCards.length - 2].style.backgroundColor = '#008a00'
  }, 1000)
  setTimeout(function () {
    cardClickActive = true
    incrementMoveCounter()
  }, 1500)
}

// Runs if the cards are not matched
function dontMatch (event) {
  cardClickActive = false
  setTimeout(function () {
    // Animate and turn background red for the last two cards in the openCards array
    openCards[openCards.length - 1].parentNode.parentNode.classList.add('animated', 'wobble')
    openCards[openCards.length - 2].parentNode.parentNode.classList.add('animated', 'wobble')
    openCards[openCards.length - 1].style.backgroundColor = '#d80000'
    openCards[openCards.length - 2].style.backgroundColor = '#d80000'
  }, 1000)
  setTimeout(function () {
    // Closes the last two cards in the openCards array and removes the animation classes
    openCards[openCards.length - 1].parentNode.classList.remove('flipped')
    openCards[openCards.length - 2].parentNode.classList.remove('flipped')
    openCards[openCards.length - 1].parentNode.parentNode.classList.remove('animated', 'wobble')
    openCards[openCards.length - 2].parentNode.parentNode.classList.remove('animated', 'wobble')
  }, 2000)
  setTimeout(function () {
    // Changes background back to orange for the next time they're flipped
    openCards[openCards.length - 1].style.backgroundColor = '#df7619'
    openCards[openCards.length - 2].style.backgroundColor = '#df7619'
    // And finally, removes the last two cards from the openCards array
    openCards.splice(openCards.length - 2, 2)
    cardClickActive = true
    incrementMoveCounter()
  }, 2300)
}

// Increments the move counter by 1 on each turn
let moveCounter = 0
function incrementMoveCounter () {
  moveCounter += 1
  const counterSpan = document.querySelector('.move-counter__text-span')
  counterSpan.innerHTML = moveCounter
  // Remove star after every 12 turns
  const starList = document.querySelector('.rating__star-list')
  const star = document.querySelector('.rating__star-icon')
  if (moveCounter % 12 === 0) {
    starList.removeChild(star)
  }
}

// Checks if the game is over
function checkWin () {
  if (openCards.length === 16) {
    openModal()
  }
}

// Opens the modal and gives you your game stats
const modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal-overlay')
function openModal () {
  modal.classList.toggle('closed')
  modalOverlay.classList.toggle('closed')

  const moveSpan = document.querySelector('.modal__move-span')
  moveSpan.innerHTML = moveCounter

  const timerSpan = document.querySelector('.modal__timer-span')
  timerSpan.innerHTML = `${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`

  const starSpan = document.querySelector('.modal__star-span')
  const starsRemain = document.querySelectorAll('.rating__star-icon')
  if (starsRemain.length === 1) {
    starSpan.innerHTML = `1 Star`
  } else {
    starSpan.innerHTML = `${starsRemain.length} Stars`
  }
}

// Closes the modal and restarts the game
const modalRestartButton = document.querySelector('.modal__restart-button')
modalRestartButton.addEventListener('click', playAgain)
function playAgain (event) {
  modal.classList.toggle('closed')
  modalOverlay.classList.toggle('closed')
  restartGame(event)
}
