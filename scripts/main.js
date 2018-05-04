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
      el.addEventListener('click', takeTurn)
    })
  }

  function takeTurn (event) {
    turnCard(event)
    openCardList(event)
    checkCardMatch(event)
  }

  // Add the flipped class to any tile that's clicked
  function turnCard (event) {
    event.target.parentNode.classList.add('flipped')
  }

  // Adds cards to an open card array
  let openCards = []
  function openCardList (event) {
    const cardClass = event.target.nextElementSibling.childNodes[0].classList.item(1)
    openCards.push(cardClass)
    console.log(openCards)
  }

  // Check if cards in openCards array match
  function checkCardMatch (event) {
    if (openCards.length > 1) {
      if (openCards[0] === openCards[1]) {
        console.log('Match!')
        event.target.removeEventListener('click', takeTurn)
      } else {
        console.log('No Match!')
        console.log(event.target)
      }
    }
  }
}

/*
 * set up the event listener for a card. If a card is clicked: **DONE**
 *  - display the card's symbol (put this functionality in another function that you call from this one) **DONE**
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
