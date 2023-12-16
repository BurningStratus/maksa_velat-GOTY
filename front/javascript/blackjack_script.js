// Declare variables to store game state
let dealerSum = 0;
let playerSum = 0;
let username, loca, money, betMoney;
let startMoney;
let dealerAceCount = 0;
let playerAceCount = 0;
let hidden;
let deck;
let playCount = 1;
let canHit = true;

// Select relevant HTML elements
const tutorialButton = document.querySelector('#tutorial');
const menuButton = document.querySelector('#backToMenu');
const closeButton = document.querySelector('#X_tutorial');
const dialogTutorial = document.querySelector('#tutorialBox');
const header = document.querySelector('header');
const img = header.querySelector('img');

// Function to fetch player data from the server
data = async () => {
    const response = await fetch('http://127.0.0.1:5000/blackjack_fetch/');
    return response.json();
}

// Fetch player data and initialize game when the page loads
data()
    .then(result => {
        // Extract and display player information
        const dataa = document.querySelector('#playerInfo');
        dataa.innerHTML = `${result.username}-${result.location}-${result.money}`;
        const userData = dataa.innerHTML.split("-");
        username = userData[0];
        loca = userData[1];
        money = parseInt(userData[2]);
        startMoney = money;
        img.src = `./img/casino_names/${loca}_casino.png`
        document.querySelector('#playerInfo').innerHTML = "";
        document.querySelector('#playerInfo').innerHTML = `Your money: ${money}`
    })
    .catch(error => console.error('Error:', error));

// Initialize the game when the page loads
onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

// Function to build a standard deck of cards
function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(types[i] + "-" + values[j]);
        }
    }
}

// Function to shuffle the deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Function to start the game
function startGame() {
    // Initialize game state variables
    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // Deal cards to the dealer until the sum is 17 or higher
    let count = 1;
    while (dealerSum < 17) {
        if (count !== 1)
            createCard("dealer", true);
        else
            createCard("dealer");
        count++;
    }

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
        createCard("player");
    }

    // Display player's current money and prompt for a bet
    document.querySelector("#hit").addEventListener('click', hit);
    document.querySelector('#stay').addEventListener('click', stay);
    setTimeout(bet, 1000);
}

// Function to prompt the player for a bet
function bet() {
    betMoney = parseInt(prompt('How much money are you betting?'));
    document.querySelector('#playerInfo').innerHTML += `   Bet: ${betMoney}`;
}

// Function to handle the player hitting (drawing a card)
function hit() {
    createCard("player");
}

// Function to handle the player staying (not drawing any more cards)
function stay() {
    // Resolve the game and update player's money
    console.log(dealerAceCount);
    console.log(playerAceCount)
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;
    document.querySelector('#hidden').src = "./img/cards/" + hidden + ".png";
    const hiddenCards = document.querySelectorAll('.hidden');
    for (let i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }

    // Determine the winner and update player's money
    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
        money -= betMoney;
    } else if (dealerSum > 21) {
        message = "You Win!";
        money += betMoney * 2;
    } else if (playerSum === dealerSum)
        message = "Tie!";
    else if (playerSum > dealerSum) {
        message = "You Win!"
        money += betMoney * 2
    } else if (playerSum < dealerSum) {
        message = "You Lose!";
        money -= betMoney;
    }

    // Display the results to the user
    document.querySelector("#dealer-sum").innerHTML = dealerSum;
    document.querySelector("#player-sum").innerHTML = playerSum;
    document.querySelector("#results").innerHTML = message;

    // Check if the player was kicked out of the casino
    if (playCount >= 3)
        setTimeout(kickedOut, 1000);
}

// Function to handle the player being kicked out of the casino
async function kickedOut() {
    alert('You were kicked out of the casino');
    await fetch(`http://127.0.0.1:5000//blackjack_update/${username}/${money - startMoney}`);
    location.href = "gamePage.html";
}

// Function to handle the player choosing to play again
function playAgain() {
    const playAgain = confirm('Do you want to play again?');
    ++playCount;
    if (playAgain && playCount <= 3) {
        // Clear cards, build and shuffle a new deck, and start a new game
        clearCards();
        buildDeck();
        shuffleDeck();
        startGame();
        document.querySelector('#playerInfo').innerHTML = "";
        document.querySelector('#playerInfo').innerHTML = `Your money: ${money}`;
    } else {
        // End the game and redirect to the main game page
        alert('See ya!');
        location.href = "gamePage.html";
    }
}

// Function to reduce the value of an Ace card if necessary
function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        console.log(playerAceCount);
        console.log(playerSum);
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

// Function to clear displayed cards and results
function clearCards() {
    const dealer = document.querySelector('#dealer-cards');
    document.querySelector('#player-cards').innerHTML = "";
    document.querySelector("#dealer-sum").innerHTML = "";
    document.querySelector("#player-sum").innerHTML = "";
    document.querySelector("#results").innerHTML = "";

    dealer.innerHTML = `<img id="hidden" src="img/cards/B-B.png">`;
}

// Function to create a card and update player/dealer sum and ace count
function createCard(who, hidden = false) {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./img/cards/" + card + ".png";

    switch (who) {
        case "player":
            playerSum += getValue(card);
            playerAceCount += checkAce(card);
            document.querySelector('#player-cards').append(cardImg);
            break;
        case "dealer":
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            if (hidden) {
                cardImg.classList.add('hidden');
                document.querySelector('#dealer-cards').append(cardImg);
            } else
                document.querySelector('#dealer-cards').append(cardImg);
            break;
    }
}

// Function to get the numerical value of a card
function getValue(card) {
    let data = card.split("-");
    let value = data[1];

    if (isNaN(value)) {
        if (value === "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

// Function to check if a card is an Ace
function checkAce(card) {
    if (card[2] === "A")
        return 1;
    return 0;
}

// Event listeners for tutorial, close button, menu button, and play again button
tutorialButton.addEventListener('click', async function () {
    try {
        // Fetch and display game instructions
        const response = await fetch('../back/Blackjackinstuctions');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        dialogTutorial.querySelector('p').innerHTML = await response.text();
        dialogTutorial.showModal();
    } catch (error) {
        console.log('Error: ', error);
    }
});

closeButton.addEventListener('click', function () {
    dialogTutorial.querySelector('p').innerHTML = "";
    dialogTutorial.close();
});

menuButton.addEventListener('click', async function () {
    // Update player's money on the server and redirect to the main game page
    await fetch(`http://127.0.0.1:5000//blackjack_update/${username}/${money - startMoney}`);
    location.href = "gamePage.html";
});

document.querySelector('#playagain').addEventListener('click', playAgain);
