'use strict';

const startButton = document.querySelector('#start');
const loadButton = document.querySelector('#load_game');
const tutorialButton = document.querySelector('#tutorial');


startButton.addEventListener('click', function() {
    location.replace('gamePage.html');
})