/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
							 'fa-paper-plane', 'fa-paper-plane',
							 'fa-anchor', 'fa-anchor',
							 'fa-bolt', 'fa-bolt',
							 'fa-cube', 'fa-cube',
							 'fa-leaf', 'fa-leaf',
							 'fa-bicycle', 'fa-bicycle',
							 'fa-bomb', 'fa-bomb'
							];
let count = 0;
let cardTotal = 8;
let openCards;
let matches = 0; 
let sec = 0;
let moveCount = document.querySelector('.moves');
let star = '<i class="fa fa-star"></i>';
let stars = document.querySelector('.stars');
let timer;
let timeSec = document.getElementById('seconds');
let timeMin = document.getElementById('minutes');

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
 	moveCount.textContent = 0;
 	timeSec.textContent = "00";
 	timeMin.textContent = "00";
 	count = 0;
 	sec = 0;
 	matches = 0;
 	stars.innerHTML = star.concat(star + star);
 	const deck = document.querySelector('.deck');
 	let cardHTML = shuffle(cards).map((card) => {
 		return generateCard(card);
 	});


 	deck.innerHTML = cardHTML.join('');
 	runGame();
 }

 initGame();

 function runGame() {
	openCards = [];
	count = 0;
	let allCards = document.querySelectorAll('.card');

 	allCards.forEach((card) => {
 		card.addEventListener('click', (e) => {

 			if(count === 0) {
 				startTimer();
 			}

	 		count += 1;
		 	moveCount.textContent = count;

		 	gameRating();

	 		if(!card.classList.contains('open', 'show', 'match')) {
		 		openCards.push(card);
		 		card.classList.add('open', 'show'); //flips card 

		 		//check for match
		 		if(openCards.length >= 2) {

			 		let firstCardType = openCards[0].dataset.card;
			 		let sencondCardType = openCards[1].dataset.card;

			 		//cards match
			 		if(firstCardType === sencondCardType) {
			 			openCards.forEach((card) => {
				 			card.classList.add('match');
				 			card.classList.remove('open', 'show')
				 			openCards = [];
			 			});
			 				matches += 1;
			 				//display winning message end of game
			 				if(matches === cardTotal) {
			 					clearInterval(timer);
			 					var myhtml = document.createElement('div');
			 					myhtml.innerHTML = `moves: ${count}, time: ${timeMin.textContent}:${timeSec.textContent}, rating: ${stars.innerHTML}`;
			 					swal({
			 						title: 'Congratulations! YOU WON!',
			 						content: myhtml,
			 						icon: 'success',
			 						button: 'play again?'
			 					}).then((confirmed) => {
			 						if(confirmed) {
			 							initGame();
			 						}
			 					});
			 				}
			 		} else {

				 		//cards don't match
			 			setTimeout(() => {
			 				openCards.forEach((card) => {
			 					card.classList.remove('open', 'show');
			 					openCards = [];
			 				});
			 			}, 1000);
		 			}
		 		}
	 		};
 		});
 	});	
};	

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

//time the game

function startTimer() {
	function timeOut(val) {
		return val > 9 ? val : "0" + val;
	};
	timer = setInterval(function() {
		timeSec.textContent = timeOut(++sec % 60);
		timeMin.textContent = timeOut(parseInt(sec / 60, 10));
	}, 1000);
};

//user rating

function gameRating() {
	if(count <= 40) {
		stars.innerHTML = star.concat(star + star);
	} else if(count > 40 && count <= 56) {
		stars.innerHTML = star.concat(star);
	} else {
		stars.innerHTML = star;
	};
};

//restart the game
const refresh = document.querySelector('.restart');
 refresh.addEventListener('click', (e) => {
 	clearInterval(timer);
 	initGame();
 });


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
