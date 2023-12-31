'use strict';

// DOM elements
const startButton = document.getElementById('start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');
const dialogExitButton = document.querySelector('.exit-button');
const dialogWindow = document.querySelector('dialog');
const audioButton = document.querySelector('.audio');
const clickSound = document.querySelector('#clickSound');
const pickSound = document.querySelector('#pickSound');

// load players window and (X) there.
const load_players = document.getElementById('game_load_screen');
const xPlayerLoader = document.querySelector("#X_playerloader");

// Function to fetch player data from the server
async function loadPlayer() {
    try {
    const playerList = await (await fetch('http://127.0.0.1:5000/retrieve_players')).json();
    console.log(await playerList);
    return await playerList;
    } catch (error) {
        alert("ERR: Couldn't retrieve the players list. Check connection to your server/database. " + error)
    }
}
// Initial loading of players
loadPlayer()

// Function to start a new game
async function newGame(name, debt) {
    let response;
    try {
        response = await fetch(`http://127.0.0.1:5000/start/${name}/${debt}`);
        response = await response.json();
    } catch(error) {
        response = error.message;
    }
    return response;
}

function checkDebt(){
    let debt = parseInt(prompt('Debt'));
    if (debt > 501)
        return debt;
    else
        alert('Debt cannot be lower than 501 dollars. Write something higher.')
        return checkDebt();
}

// Event listener for starting a new game
startButton.addEventListener('click', async (event) => {
    console.log('event started');
    const name = prompt('Name');
    const debt = checkDebt();
    console.log(await newGame(name, debt));
    location.replace('gamePage.html');
})


// Event listener for loading players
loadButton.addEventListener('click', async function () {
    const players = await loadPlayer();
    console.log('Loading players ... ');

    for (let i = 0; i < await players.length; i++) {
        const article = document.createElement('article');

        const player_location = await players[i][0];
        const player_name = await players[i][1];
        const money = await players[i][2];
        const debt = await players[i][3];
        const date = await players[i][4];
        console.log(player_location, player_name, money, debt, date);
        
        // creating button to use player.
        const selectPlayerButton = document.createElement('button');
        // const selectPlayerButton = document.createElement('button');
        // selectPlayerButton.innerText = 'PLAY';
        selectPlayerButton.value = await player_name;
        selectPlayerButton.classList.add('buttons');
        selectPlayerButton.addEventListener('click', async (object) => {
            const name = object.target.value;
            console.log('Selected player: ' + name);
            await newGame(name, debt);
            location.replace('gamePage.html');
        })
        // date
        // CHANGES >>>>>
        const span_date = document.createElement('div');
        span_date.innerHTML = 
        `${await player_name}   MONEY ${await money}$     DEBT:${await debt}$     ${await date}   ${await player_location}`;
        // span_date.innerHTML = `${await date}`;

        /*
        // in row: `${await date} ${await player_name} $${await money} $${await debt} ${await location}`;
        // name
        const span_name = document.createElement('span');
        span_name.innerHTML  = `${await player_name}`;
        // money
        const span_money = document.createElement('span');
        span_money.innerHTML = `$${await money}`;
        // debt
        const span_debt = document.createElement('span');
        span_debt.innerHTML  = `$${await debt}`;
        // location
        const span_location = document.createElement('span');
        span_location.innerHTML = `${await player_location}`;
        */
        article.append(selectPlayerButton, span_date);
        // article.append(span_name, span_money, span_debt, span_date, span_location, );
        load_players.append(article);
    }
    console.log("players loaded.")
    load_players.showModal();
    
    // location.replace('gamePage.html');
});

xPlayerLoader.addEventListener('click', function () {
    const articles = load_players.querySelectorAll('article');
    for (let i = 0; i < articles.length; i++) {
        load_players.removeChild(load_players.querySelector('article'));
    }
    load_players.close();
});

tutorialButton.addEventListener('click', async function () {
    try {
        // Reads Instruction
        const response = await fetch('../back/Game_instructions_README');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        //Shows the instruction
        document.querySelector('#tutorialP').innerHTML = await response.text();
        dialogWindow.showModal();
    }
    catch (error){
        console.log('Error: ', error);
    }
});

//Closes the tutorial dialog window
dialogExitButton.addEventListener('click', function(){
    dialogWindow.close();
});

// Audio button clicked changes it from muted to unmuted and otherway
audioButton.addEventListener('click', function (){
    const audio = document.querySelector('audio');
    if (audio.paused) {
      audio.play();
      audioButton.id = 'mute';
   } else {
      audio.pause();
      audioButton.id = 'unmute';
   }
    // if (audioButton.id === 'mute'){
    //     audio.muted = true;
    //     audioButton.id = 'unmute';
    // } else {
    //    audio.muted = false;
    //    audioButton.id = 'mute';
    // }
});


///click sounds
tutorialButton.addEventListener('mouseover', () => {
    // Play the click sound when hovering over the button
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
});
loadButton.addEventListener('mouseover', () => {
    // Play the click sound when hovering over the button
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
});
startButton.addEventListener('mouseover', () => {
    // Play the click sound when hovering over the button
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
});
audioButton.addEventListener('mouseover', () => {
    // Play the click sound when hovering over the button
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
});