

// 1. blackjack buttons
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');

// button event handlers
hitButton.addEventListener('click', async (event) => {
    null
})


let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0; //A, 2 + K -> 11-10 + 2 + 10

let hidden;
let deck;

let canHit = true; //allows player to draw while yourSum <= 21

onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(types[i] + "-" + values[j]); //C-A -> C-K, D-A -> D-K
        }
    }
   // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 -> (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="../img/cards/C-4.png">
        createCard("dealer");
    }
    console.log(dealerSum)

    for (let i = 0; i < 2; i++) {
        createCard("player");
    }
    console.log(playerSum);
    document.querySelector("#hit").addEventListener('click', hit);
    document.querySelector('#stay').addEventListener('click', stay);
}

function hit() {
    if (!canHit) {
        return;
    }
    createCard("player");

    // if (reduceAce(playerSum, playerAceCount) > 21) { //A,J,K -> 1 + 10 + 8
    //     canHit = false;
    // }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.querySelector('#hidden').src = "./img/cards/" + hidden + ".png";

    let message = "";
    if(playerSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and the dealer <= 21
    else if (playerSum === dealerSum)
        message = "Tie!";
    else if (playerSum > dealerSum)
        message = "You Win!"
    else if (playerSum < dealerSum)
        message = "You Lose!";

    document.querySelector("#dealer-sum").innerHTML = dealerSum;
    document.querySelector("#player-sum").innerHTML = playerSum;
    document.querySelector("#results").innerHTML = message;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function createCard(who) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = "./img/cards/" + card + ".png";
        console.log(cardImg.src);
        switch (who) {
            case "player":
                playerSum += getValue(card);
                playerAceCount += checkAce(card);
                document.querySelector('#player-cards').append(cardImg);
                break;
            case "dealer":
                dealerSum += getValue(card);
                dealerAceCount += checkAce(card);
                document.querySelector('#dealer-cards').append(cardImg);
                break;
        }
}

function getValue(card) {
    let data = card.split("-"); //"C-4 -> ["C", "4"]
    let value = data[1];

    if(isNaN(value)){ // A J Q K
        if (value === "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value); //10 9 8 7 6 5 4 3 2
}

function checkAce(card) {
    if(card[1] === "A")
        return 1;
    return 0;
}