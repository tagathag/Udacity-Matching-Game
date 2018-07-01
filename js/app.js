/*
 * Create a list that holds all of your cards
 */
let array = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffledArray = shuffle(array);

let list = makeUL(shuffledArray);

let openCards = [];

let matchedCardsArray = [];

let moves = 0;

let start = true;

let stopTimer = false;

let starRating = 4;

let card = document.getElementsByClassName("card");

document.getElementById("container").appendChild(list);

addEventListeners();

timer();

// function that it is called after user clicks on a card. It shows the card
function displayCard(e){
    e.target.setAttribute("class","card open show");
    addToOpenCards(e.target);
}

// function that stores the card in an array of opened cards
function addToOpenCards(element){
    element.removeEventListener("click",displayCard);
    openCards.push(element);
    console.log(openCards);
    cardsMatchControl(openCards.length);
}

// function that compares the two open cards, increments the moves, removes the event listeners for a specific time and after that time add the Event Listeners onces more.
// In case the cards are the same it calls the lockCards function, otherwise it hides them.
function cardsMatchControl(openCardsLength){
    if (openCardsLength==2) {
        moves++;
        moveCounter(moves);
        removeEventListeners();
        setTimeout(function(){
            for (let i=0; i < array.length; i++){
                card[i].addEventListener("click",displayCard);
            }
        },1100);
        Element1= openCards[0];
        childElement1=Element1.firstChild;
        Element2= openCards[1];
        childElement2=Element2.firstChild;
        if (childElement1.className==childElement2.className){
            lockCards(childElement1.className);
        }else{
            Element1.setAttribute("class","card show shake")
            Element2.setAttribute("class","card show shake")
            setTimeout(function(){
                Element1.setAttribute("class","card");
                Element1.addEventListener("click",displayCard);
                Element2.setAttribute("class","card");
                Element2.addEventListener("click",displayCard);
            },1000);
        }
        removeCards(Element1,Element2);
    }
    
}

// function that stores the paired cards and calls the finish function
function lockCards(listItemClass1){
    let matchedCards=document.getElementsByClassName(listItemClass1);
    matchedCard1=matchedCards[0].parentNode;
    matchedCard2=matchedCards[1].parentNode;
    matchedCard1.setAttribute("class","card match");
    matchedCard2.setAttribute("class","card match");
    matchedCardsArray.push(matchedCard1,matchedCard2);
    finish();
}

// function that removes the cards from the openCards array
function removeCards(Element1,Element2){
    openCards.splice(0,2);
}

// function that gives the star score
function moveCounter(moves){
    document.querySelector(".moves").textContent=moves.toString()+" Moves";
    
    if (moves==12){
        let star = document.querySelector("#star4");
        star.setAttribute("class","fa fa-star-o");
        starRating =3;
        // $('#myModal').modal('show')
    }else if (moves==15){
        let star = document.querySelector("#star3");
        star.setAttribute("class","fa fa-star-o");
        starRating =2;
    }else if (moves==20){
        let star = document.querySelector("#star2");
        star.setAttribute("class","fa fa-star-o");
        starRating =1;
    }

}

// function that adds all the Event Listeners
function addEventListeners(){
    for (let i=0; i < array.length; i++){
        card[i].addEventListener("click",displayCard);
    }

    document.getElementById("restartButton").addEventListener("click",function(){
        location.reload();
    })
}

// function that removes the Event Listeners except the one of the "restart" button
function removeEventListeners(){
    for (let i=0; i < array.length; i++){
        card[i].removeEventListener("click",displayCard);
    }
}

// function that checks whether all the cards are matched
function finish(){
    if (matchedCardsArray.length==16){
        let results = document.getElementById("results");
        let time = document.getElementById("timer").textContent;
        results.textContent=moves.toString()+" moves, your time was: "+time+" and your star rating was "+starRating+" !!";
        $('#myModal').modal('show');
        stopTimer=true;
    }
}

// function that makes an unordered list given an array
function makeUL(array) {
    // Create the list element:
    let list = document.createElement('ul');
    list.setAttribute("id","deck");
    list.setAttribute("class","deck");

    for(let i = 0; i < array.length; i++) {
        // Create the list item:
        let listItem = document.createElement('li');
        listItem.setAttribute("class","card");
       

        // Set its contents:
        let item = document.createElement("i");
        item.setAttribute("class",array[i]);
        listItem.appendChild(item);


        // Add it to the list:
        list.appendChild(listItem);
    }

    // Finally, return the constructed list:
    return list;
}

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

// timer function
function timer() {
	if (start == true) {
        let timer = 0;
		let hour = 0;
		let minute = 0;
		let second = 0;
		window.setInterval (function() {
		  ++timer;
		  hour = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
		  if(stopTimer) {
			document.querySelector('#timer').innerHTML = "00:00:00";
			timer = 0;
			hour = 0;
			minute = 0;
			second = 0;
			return;
		  }
        }, 1000);
	}
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
