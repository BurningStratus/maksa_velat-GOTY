'use strict';
const startButton = document.getElementById('start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');
const dialogExitButton = document.querySelector('.exit-button');
const dialogWindow = document.querySelector('dialog');
const audioButton = document.querySelector('.audio');

// load players window and (X) there.
const load_players = document.getElementById('game_load_screen');
const xPlayerLoader = document.querySelector("#X_playerloader");


async function loadPlayer() {
    const playerList = await (await fetch('http://127.0.0.1:5000/retrieve_players')).json();
    console.log(await playerList);
    return await playerList;
}

loadPlayer()


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
// Todo: CONNECT USERNAME AND BACKEND
startButton.addEventListener('click', async (event) => {
    console.log('event started');
    const name = prompt('Name')
    const debt = parseInt(prompt('Debt'));
    console.log(await newGame(name, debt));
    location.replace('gamePage.html');
})


loadButton.addEventListener('click', async function () {
    const players = await loadPlayer();
    console.log('Loading players ... ');

    for (let i = 0; i < await players.length; i++) {
        const article = document.createElement('article');

        const location = await players[i][0];
        const player_name = await players[i][1];
        const money = await players[i][2];
        const debt = await players[i][3];
        const date = await players[i][4];
        console.log(location, player_name, money, debt, date);

        // date
        const span_date = document.createElement('div');
        span_date.innerHTML  = `${await date}`;
        
        // in row: `${await date} ${await player_name} $${await money} $${await debt} ${await location}`;
        // name
        const span_name = document.createElement('div');
        span_name.innerHTML  = `${await player_name}`;
        // money
        const span_money = document.createElement('div');
        span_money.innerHTML = `$${await money}`;
        // 
        const span_debt = document.createElement('div');
        span_debt.innerHTML  = `$${await debt}`;

        const span_location = document.createElement('div');
        span_location.innerHTML = `${await location}`;
        
        article.append(span_date);
        article.append(span_date, span_name, span_money, span_debt, span_location);
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
    if (audioButton.id === 'mute'){
        audio.muted = true;
        audioButton.id = 'unmute';
    } else {
       audio.muted = false;
       audioButton.id = 'mute';
    }
});