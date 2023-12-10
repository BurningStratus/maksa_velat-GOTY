'use strict';

const startButton = document.querySelector('#start');

let username;

startButton.addEventListener('click', function() {
    username = prompt("What's your name?");
});


