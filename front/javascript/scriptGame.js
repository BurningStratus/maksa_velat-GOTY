'use strict';

// element with id=quest will be dataHolder for the development time.
// find by CTRL + F : quest_test

let username;
let gameState = ['IN PROGRESS', 0];

// Asynchronous function to initialize the player
async function initPlayer(player) {
 // Fetch player information from the server
    const response = await fetch('http://127.0.0.1:5000/infoDex_userinit/caller/');
    const responseJS = await response.json();

    // Switch statement to handle the player parameter
    switch (player) {
        case undefined:
            console.log("Pulled name: " + await responseJS.player, "Current: ", player, "Using pulled one.");
            player = await responseJS.player;
            console.log('player initialised.', await player)
            return player
    }
}
// Initialize the player and update the 'username' variable
const namepromise = initPlayer(username)
namepromise.then(response => (username = response))


// cities' and countries' fetch function initMap() for creating a playing zone.
// with initMap(), you NEED and you WANT Decimal() function. Otherwise, you will get a mess.
/*
Example response:
[[lat, long, country, city]]
[[Decimal('52.367600'), Decimal('4.904100'), 'Holland', 'Amsterdam'], ...]
*/

// Function to convert a float to a decimal
function Decimal(float) {
    return parseFloat(float);
}
// Function to convert a float to a decimal
async function initMap(location) {
     // Fetch cities' information from the server
    const cities = await fetch('http://127.0.0.1:5000/init_cities');
    const markersJSON = await cities.json();
    console.log(markersJSON);
     // Create a dot icon for markers
    const dotIcon = new L.Icon({
        iconUrl: './img/marker-red.png',
        iconSize: [12, 12], // Adjust the size to make it look like a dot
        iconAnchor: [6, 6], // Half of the size
        popupAnchor: [0, 0],
    });
        // Iterate through the markers and add them to the map
    for (let i = 0; i < await markersJSON.length; i++) {
        const mark = L.marker([markersJSON[i][0], markersJSON[i][1]], {icon: dotIcon}).addTo(map);
        mark.bindPopup(`<h1><b>${markersJSON[i][3]}, ${markersJSON[i][2]}</b></h1>`);
         // Set the end marker if the location matches
        if (location === markersJSON[i][4]) {
            loppuMarker.setLatLng([markersJSON[i][0], markersJSON[i][1]]);
            loppuMarker.bindPopup(`<h1><b>${markersJSON[i][2]}, ${markersJSON[i][3]}<b></h1>`)
        }
    }
}
// Leaflet map initialization
var map = L.map('map').setView([51.505, -0.09], 5);
map.setMinZoom(5)
// Add OpenStreetMap tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// Create a red icon for the player marker
const redIcon = L.icon({
    iconUrl: 'img/player_marker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
// Initialize a marker for the end location and add it to the map
var loppuMarker = L.marker([48.8566, 2.3522], {icon: redIcon}).addTo(map);

// Bind a popup to the end marker
loppuMarker.bindPopup("<h1><b>Paris, France<b></h1>");


// navigation panel ahead >>
//////////////////////////////////////////////////////////////
const listAirports = document.getElementById('dests');
const infoDex_log = document.getElementById('infoDEX_log');

let date = document.getElementById('date');
let currLocation = document.getElementById('location');
let money = document.getElementById('money');
let debt = document.getElementById('debt');


// checks if the game is won, lost or ongoing.
function checkGameState(state) {
    const state_game = state[0];
    const score = state[1];

    const loser_screen = document.getElementById('loser_screen');
    const loser_text = document.getElementById('loser_box_text');
    const loser_yes = document.getElementById('loser_yes');
    const loser_score = document.getElementById('loser_score');
    loser_screen.querySelector('img').style.width = "80%";



    console.log('function casted. game state', state);

    switch (state_game) {
        case "IN PROGRESS":
            console.log(state_game);
            break;

        case "BANKRUPT":
             loser_yes.addEventListener('click', () => {
                location.replace('main-menu.html'); ``
                loser_text = '';
             })
            loser_text.innerText =
            `You have gambled your life away, but you realised it when it was too late. 
            Lady luck wasn't on your side, if it ever was.
            
            You had to sell everything you had to get back to Monaco, but this time
            you weren't given any chance for payoff. From now on, you will have to 
            work for local kingpin until you pay off the debt.
            `

            loser_screen.querySelector('img').src = "./img/loser.png";
            loser_screen.showModal();
            break;

        case "WON":
            loser_yes.innerText = "Continue";
            document.querySelector('#win').src = "./music/winningSound.mp3"
            document.querySelector('#win').play();
            loser_yes.addEventListener('click', async () => {
                loser_yes.innerText = "Main Menu";
                loser_screen.querySelector('img').src = "./img/WaitAminute.gif";
                 try {
                    // Fetch and display game instructions
                    const response = await fetch('../back/Epilogue');
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data: ${response.statusText}`);
                    }
                    loser_text.innerHTML = `<h1>EPILOGUE</h1><br>`
                    loser_text.innerText += await response.text();
                } catch (error) {
                    console.log('Error: ', error);
                }
                loser_yes.addEventListener('click', () => {
                    location.replace('main-menu.html');
                    loser_text = '';
                });
             })
            loser_text.innerText =
            `You managed to pay off your debt. 
            As a result, you've earned a good reputation with the casino, and you took out greater loans.
            
            But are you really winning if you stay in a sinful infinite loop?`

            loser_score.innerText = `Your score: ${score}`
            loser_screen.querySelector('img').src = "./img/winner-image.png"
            loser_screen.showModal();
            break;
    }
}


async function infoDex(name) {
    let response;
    try {
        if (name == undefined) {

        response = await fetch(`http://127.0.0.1:5000/infoDex_navigation/undef_name`);
        response = await response.json();

        } else {

        response = await fetch('http://127.0.0.1:5000/infoDex_navigation/'+ name);
        response = await response.json();}

        infoDex_log.innerHTML += 'Data retrieved.<br>';
    } catch (error) {
        response = error.message;
        console.error('error. infoDex', response)
    }
    return await response;
}

async function updateTerminal(name) {
    // to update during the game
    let date = document.getElementById('date');
    let currLocation = document.getElementById('location');
    let money = document.getElementById('money');
    let debt = document.getElementById('debt');

    const data = await infoDex(name);
    gameState = await data.game_state;
    checkGameState(gameState);
    // debug
    console.log("Player info: ", data);

    currLocation.innerText = data.location;
    money.innerText = `Money:  ${data.money}`;
    debt.innerText = `Debt:  ${data.debt}`;
    date.innerText = data.date;

    // gamestate will monitor the game progress.

    // quest_test
    const quest_name = document.getElementById('quest')
    const qname = await data.quest;
    if (qname !== "NONE_quest")
        quest_name.innerText = "Quest";
    else
        quest_name.innerText = await data.quest;
    quest_name.value = await data.quest;
    // quest_test

    infoDex_log.innerHTML += `Your position: ${await data.location}<br>`;
    await initMap(data.location);
    return data.airports;
}

async function printAirports(name) {

    const listOfDestinations = document.getElementById('dests');
    const airports = await updateTerminal(name);
    // creating articles with text, button and event listener.
    for (let i = 0; i < 9; i++) {
        const airport = await airports[i];
        const travelButton = document.createElement('button');
        const dest = document.createElement('li');
        const ICAOcode = document.createElement('span');

        // "PA Paris France"
        ICAOcode.innerText = airport;

        travelButton.classList.add('buttons');
        dest.append(ICAOcode, travelButton);
        dest.classList.add('travelButton');

        const ICAO = await airport.split(' ')[0];
        travelButton.value = ICAO;

        travelButton.addEventListener('mouseover', () => {
           document.querySelector('#click').src = "./music/click1.mp3";
           document.querySelector('#click').play();
        });
        await travelButton.addEventListener('click', (object) => {
            document.querySelector('#fly').src = "./music/fly.mp3";
            document.querySelector('#fly').play();
            listAirports.innerHTML = '';
            flyto(username, object.target.value);
        });

        listOfDestinations.append(dest);
    }
}

async function flyto(name, airport) {
    const flight = await fetch(`http://127.0.0.1:5000/navigation.${airport}.${name}`);
    // console.log(await flight.json());
    await printAirports(username);
}

//<span id="loser_close">X</span>
// <img id="loser_img">
// <p id="loser_box_text"></p>
// <button id="loser_yes">Main menu</button>
/////////////////////////////////////////////////////////////


console.log(gameState);
printAirports(username);

