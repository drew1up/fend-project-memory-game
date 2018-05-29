/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
							 'fa-paper-plane', 'fa-paper-plane',
							 'fa-anchor', 'fa-anchor',
							 'fa-bolt', 'fa-bolt',
							 'fa-cube', 'fa-cube',
							 'fa-leaf', 'fa-leaf',
							 'fa-bicycle', 'fa-bicycle',
							 'fa-bomb', 'fa-bomb'
							];

function generateCard(card) {
	return `<li class="card" data-card="${card}""><i class="fa ${card}"></i></li>`
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 function initGame() {
 	shuffle(cards);
 	const deck = document.querySelector('.deck');
 	let cardHTML = cards.map((card) => {
 		return generateCard(card);
 	});

 	deck.innerHTML = cardHTML.join('');
 }

 initGame();


 const allCards = document.querySelectorAll('.card');
 const moves = document.querySelector('.moves');
 let openCards = [];
 let count = 0

 allCards.forEach((card) => {
 	card.addEventListener('click', (e) => {

 		if(!card.classList.contains('open', 'show', 'match')) {
	 		openCards.push(card);
	 		card.classList.add('open', 'show'); //flips card 
	 		count += 1;
	 		moves.textContent = count;

	 		//check for match
	 		let firstCardType = openCards[0].dataset.card;
	 		let sencondCardType = openCards[1].dataset.card;

	 		if(firstCardType === sencondCardType) {
	 			openCards.forEach((card) => {
		 			card.classList.add('match');
		 			card.classList.remove('open', 'show')
		 			openCards = [];
	 			});
	 		}


	 		//cards that don't match disappear
	 		if(openCards.length >= 2 && firstCardType !== sencondCardType) {
	 			setTimeout(() => {
	 				openCards.forEach((card) => {
	 					card.classList.remove('open', 'show');
	 					openCards = [];
	 				});
	 			}, 1000);
	 		}
 		};
 	});
 });

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
