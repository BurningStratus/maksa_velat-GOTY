'use strict';

const startButton = document.querySelector('#start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');
let username;

startButton.addEventListener('click', function() {
    username = prompt("What's your name?");
    location.replace('gamePage.html');
});

loadButton.addEventListener('click', function () {
    username = prompt("What's your name?");
    location.replace('gamePage.html');
});