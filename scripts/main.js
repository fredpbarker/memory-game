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

  function ifCardIsClicked (event) {
    flipCard(event)
    openCardList(event)
    checkCardMatch(event)
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
    console.log(openCards)
  }

  function checkCardMatch (event) {
    // TODO; AFTER ONE SUCCESSFULLY MATCHED PAIR, THIS BECOMES ALWAYS TRUE SO IT TRIES TO RUN ON EVERY SINGLE CARD CLICKED, INSTEAD OF ON A PAIR OF CARDS?
    if (openCards.length > 1) {
      let openCard1 = openCards[openCards.length - 1].childNodes[0].classList.item(1)
      let openCard2 = openCards[openCards.length - 2].childNodes[0].classList.item(1)
      if (openCard1 === openCard2) {
        doMatch(event)
      } else if (openCard1 !== openCard2) {
        dontMatch(event)
      }
    }
  }

  function doMatch (event) {
    openCards[openCards.length - 1].previousElementSibling.removeEventListener('click', ifCardIsClicked)
    openCards[openCards.length - 2].previousElementSibling.removeEventListener('click', ifCardIsClicked)
  }

  function dontMatch (event) {
    openCards.forEach(function (el) {
      setTimeout(function () {
        el.parentNode.parentNode.classList.add('animated', 'wobble')
        el.style.backgroundColor = '#dc143c'
      }, 1000)
      setTimeout(function () {
        el.parentNode.classList.remove('flipped')
        el.parentNode.parentNode.classList.remove('animated', 'wobble')
        openCards.splice(openCards.length - 2, 2)
      }, 2000)
      setTimeout(function () {
        el.style.backgroundColor = '#df7619'
      }, 3500)
    })
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
