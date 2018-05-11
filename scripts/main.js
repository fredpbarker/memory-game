// Target the start and restart buttons
const restartButton = document.querySelector('.restart-button')

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

// Add an event handler that runs the startGame() function when the start button is clicked
const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startGame)

// Start game
function startGame (event) {
  event.preventDefault()
  shuffleCardList(cardList)
  addCardToPage(cardList)
  addEventListenerToCards()

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
      let cardHTML = document.createElement('li')
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

  // Checks of the cards match
  function checkCardMatch (event) {
    if (pairCheckCounter % 2 === 0) { // Only runs on even cards/pairs
      let openCard1 = openCards[openCards.length - 1].childNodes[0].classList.item(1) // Gets the Font Awesome class, example: fa-gem
      let openCard2 = openCards[openCards.length - 2].childNodes[0].classList.item(1)
      if (openCard1 === openCard2) {
        doMatch(event)
      } else if (openCard1 !== openCard2) {
        dontMatch(event)
      }
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
    cardClickActive = true
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
    }, 2300)
  }
}
