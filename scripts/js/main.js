// TOGGLE THE FLIPPED CLASS ON AND OFF

function toggleClass (event) {
  event.target.parentNode.classList.toggle('flipped')
}

const deck = document.querySelector('.deck')
deck.addEventListener('click', toggleClass)
