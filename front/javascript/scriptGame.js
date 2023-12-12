'use strict';

// element with id=quest will be dataHolder for the development time.
// find by CTRL + F : quest_test

let username;
async function initPlayer(player) {

    const response = await fetch('http://127.0.0.1:5000/infoDex_userinit/caller/');
    const responseJS = await response.json();

    switch (player) {
        case undefined:
            console.log("Pulled name: " + await responseJS.player, "Current: ", player, "Using pulled one.");
            player = await responseJS.player;
            console.log('player initialised.', await player)
            return player
    }
}
const namepromise = initPlayer(username)
namepromise.then(response => (username = response))


// cities' and countries' fetch function initMap() for creating a playing zone.
// with initMap(), you NEED and you WANT Decimal() function. Otherwise, you will get a mess.
/*
Example response:
[[lat, long, country, city]]
[[Decimal('52.367600'), Decimal('4.904100'), 'Holland', 'Amsterdam'], ...]
*/


function Decimal(float) {
    return parseFloat(float);
}

async function initMap(location) {
    const cities = await fetch('http://127.0.0.1:5000/init_cities');
    const markersJSON = await cities.json();
    console.log(markersJSON);
    const dotIcon = new L.Icon({
        iconUrl: './img/marker-red.png',
        iconSize: [12, 12], // Adjust the size to make it look like a dot
        iconAnchor: [6, 6], // Half of the size
        popupAnchor: [0, 0],
    });
    // write your code here
    for (let i = 0; i < await markersJSON.length; i++) {
        const mark = L.marker([markersJSON[i][0], markersJSON[i][1]], {icon: dotIcon}).addTo(map);
        mark.bindPopup(`<h1><b>${markersJSON[i][3]}, ${markersJSON[i][2]}</b></h1>`);
        if (location === markersJSON[i][4]) {
            loppuMarker.setLatLng([markersJSON[i][0], markersJSON[i][1]]);
            loppuMarker.bindPopup(`<h1><b>${markersJSON[i][2]}, ${markersJSON[i][3]}<b></h1>`)
        }
    }
    // return markersJSON;
}

var map = L.map('map').setView([51.505, -0.09], 5);
map.setMinZoom(5)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const redIcon = L.icon({
    iconUrl: 'img/player_marker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var loppuMarker = L.marker([48.8566, 2.3522], {icon: redIcon}).addTo(map);

loppuMarker.bindPopup("<h1><b>Paris, France<b></h1>");


// navigation panel ahead >>
//////////////////////////////////////////////////////////////
const listAirports = document.getElementById('dests');
const infoDex_log = document.getElementById('infoDEX_log');

let date = document.getElementById('date');
let currLocation = document.getElementById('location');
let money = document.getElementById('money');
let debt = document.getElementById('debt');

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
    // debug
    console.log("Player info: ", data);

    currLocation.innerText = data.location;
    money.innerText = `Money:  ${data.money}`;
    debt.innerText = `Debt:  ${data.debt}`;
    date.innerText = data.date;

    // quest_test
    const quest_name = document.getElementById('quest')
    quest_name.innerText = await data.quest;
    quest_name.value = await data.quest;
    // quest_test

    infoDex_log.innerHTML += `Your position: ${await data.location}<br>`;
    await initMap(data.location);
    return data.airports;
}

async function printAirports(name) {
    const airports = await updateTerminal(name);
    const listOfDestinations = document.getElementById('dests');

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

        await travelButton.addEventListener('click', (object) => {
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

/////////////////////////////////////////////////////////////

printAirports(username);
/// only for development: should be removed after >>

/*
async function questCaller(screen_name) {
    const quest = prompt("Quest tag and data: [MONA0 or MONA1]");
    const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.${quest}`);
    const resp = await complete.json();
    return resp;
}
const quest = document.getElementById('quest');

quest.addEventListener('click', async (click) => {
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');

    const info = await questCaller(username);
    console.log(info, 'Before exception')
    await updateTerminal(username);

    infoDex_log.innerHTML += `${await info[1]}<br>`;
})
*/