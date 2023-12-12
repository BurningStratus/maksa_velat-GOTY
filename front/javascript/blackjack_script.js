let dealerSum = 0;
let playerSum = 0;

let username,loca,money,betMoney;
let startMoney;

let dealerAceCount = 0;
let playerAceCount = 0; //A, 2 + K -> 11-10 + 2 + 10 -> 13 A  -> 14 + K -> 24

let hidden;
let deck;
let playCount = 1;

let canHit = true; //allows player to draw while yourSum <= 21

const tutorialButton = document.querySelector('#tutorial');
const menuButton = document.querySelector('#backToMenu');
const closeButton = document.querySelector('#X_tutorial');
const dialogTutorial = document.querySelector('#tutorialBox');


data = async () => {
    const response = await fetch('http://127.0.0.1:5000/blackjack_fetch/');
    return response.json();
}

data()
    .then(result => {
        const dataa = document.querySelector('#playerInfo');
        dataa.innerHTML = `${result.username}-${result.location}-${result.money}`;
        const userData = dataa.innerHTML.split("-");
        username = userData[0];
        loca = userData[1];
        money = parseInt(userData[2]);
        startMoney = money;
        document.querySelector('#playerInfo').innerHTML = "";
        document.querySelector('#playerInfo').innerHTML = `Your money: ${money}`

    })
    .catch(error => console.error('Error:', error));


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
    // console.log(deck)
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
    dealerSum = 0;
    playerSum = 0;

    dealerAceCount = 0;
    playerAceCount = 0; //A, 2 + K -> 11-10 + 2 + 10 -> 13 A  -> 14 + K -> 24

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    let count = 1;
    while (dealerSum < 17) {
        //<img src="../img/cards/C-4.png">
        if (count !== 1)
            createCard("dealer", true);
        else
            createCard("dealer")
        count++;

    }
    console.log(dealerSum)

    for (let i = 0; i < 2; i++) {
        createCard("player");
    }
    console.log(playerSum);
    document.querySelector("#hit").addEventListener('click', hit);
    document.querySelector('#stay').addEventListener('click', stay);
    setTimeout(bet, 1000);
}

function bet() {
    betMoney = parseInt(prompt('How much money you betting?'));
    document.querySelector('#playerInfo').innerHTML +=  `   Bet: ${betMoney}`;
}

function hit() {
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
    const hiddenCards = document.querySelectorAll('.hidden');
    for (let i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }

    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
        money -= betMoney;
    } else if (dealerSum > 21) {
        message = "You win!";
        money += betMoney * 2;
    }
    //both you and the dealer <= 21
    else if (playerSum === dealerSum)
        message = "Tie!";
    else if (playerSum > dealerSum) {
        message = "You Win!"
        money += betMoney * 2
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
        money -= betMoney;
    }

    document.querySelector("#dealer-sum").innerHTML = dealerSum;
    document.querySelector("#player-sum").innerHTML = playerSum;
    document.querySelector("#results").innerHTML = message;
    if (playCount >= 3)
        setTimeout(kickedOut, 1000);
}

async function kickedOut() {
    alert('You were kicked out of the casino');
    await fetch(`http://127.0.0.1:5000//blackjack_update/${username}/${money - startMoney}`);
    location.href = "gamePage.html";
}

function playAgain() {
    const playAgain = confirm('Do you want to play again?');
    ++playCount;
    if (playAgain && playCount <= 3) {
        clearCards();
        buildDeck();
        shuffleDeck();
        startGame();
        document.querySelector('#playerInfo').innerHTML = "";
        document.querySelector('#playerInfo').innerHTML = `Your money: ${money}`;
    } else {
        alert('See ya!');
        location.href = "gamePage.html";
    }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


function clearCards() {
    const dealer = document.querySelector('#dealer-cards');
    document.querySelector('#player-cards').innerHTML = "";
    document.querySelector("#dealer-sum").innerHTML = "";
    document.querySelector("#player-sum").innerHTML = "";
    document.querySelector("#results").innerHTML = "";

    dealer.innerHTML = `<img id="hidden" src="img/cards/B-B.png">`;
}

function createCard(who, hidden = false) {
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
            if (hidden) {
                cardImg.classList.add('hidden');
                document.querySelector('#dealer-cards').append(cardImg);
            } else
                document.querySelector('#dealer-cards').append(cardImg);
            break;
    }
}

function getValue(card) {
    let data = card.split("-"); //"C-4 -> ["C", "4"]
    let value = data[1];

    if (isNaN(value)) { // A J Q K
        if (value === "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value); //10 9 8 7 6 5 4 3 2
}

function checkAce(card) {
    if (card[1] === "A")
        return 1;
    return 0;
}


tutorialButton.addEventListener('click', async function () {
    try {
        // Reads Instruction
        const response = await fetch('../back/Blackjackinstuctions');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        //Shows the instruction
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
    await fetch(`http://127.0.0.1:5000//blackjack_update/${username}/${money - startMoney}`);
    location.href = "gamePage.html";
});

document.querySelector('#playagain').addEventListener('click', playAgain);