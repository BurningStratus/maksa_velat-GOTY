'use strict';
const startButton = document.getElementById('start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');
const dialogExitButton = document.querySelector('.exit-button');
const dialogWindow = document.querySelector('dialog');
const audioButton = document.querySelector('.audio');


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


loadButton.addEventListener('click', function () {
    username = prompt("What's your name?");
    location.replace('gamePage.html');
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