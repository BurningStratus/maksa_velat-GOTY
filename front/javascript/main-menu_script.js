'use strict';

const startButton = document.getElementById('start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');
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

startButton.addEventListener('click', (event) => {
    console.log('event started');
    const name = prompt('Name');
    const debt = parseInt(prompt('Debt'));
    console.log(newGame(name, debt));
    location.replace('gamePage.html');
})


loadButton.addEventListener('click', function () {
    username = prompt("What's your name?");
    location.replace('gamePage.html');
});