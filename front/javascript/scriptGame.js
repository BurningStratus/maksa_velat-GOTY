'use strict';

let username;


async function initPlayer(player) {

    const response = await fetch('http://127.0.0.1:5000/infoDex_userinit/caller/');
    const responseJS = await response.json();

    switch (player) {
        case undefined:
            console.log("Pulled name: " + await responseJS.player, "Current: ", player, "Using pulled one.");
            player = await responseJS.player;
            console.log(await player);
            console.log('player initialised.')
            return player
        }
}
// username.then(response => (console.log(response)))
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

async function initMap() {
    const cities = await fetch('http://127.0.0.1:5000/init_cities');
    const markersJSON = await cities.json();
    console.log(markersJSON);
    // write your code here
   // for (let i = 0; i < await markersJSON.length; i++) {
   //     const mark = L.marker([markersJSON[i][0],markersJSON[i][1]]).addTo(map);
   //     mark.bindPopup(`<h1><b>${markersJSON[i][3]}, ${markersJSON[i][2]}</b>></h1>`);
//}
    // return markersJSON;
}

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);
const redIcon = L.icon({
    iconUrl: 'img/map-marker.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const defaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var loppuMarker = L.marker([48.8566,  2.3522], { icon: redIcon}).addTo(map);

marker.bindPopup("<h1><b>London, England<b></h1>");
loppuMarker.bindPopup("<h1><b>Paris, France<b></h1>");

marker.on('click', function() {
    const isConfirmed = confirm("Do you want to fly here?");

    if (isConfirmed){
        marker.setIcon(redIcon); 
        loppuMarker.setIcon(defaultIcon);
    }
});

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
        response = await fetch('http://127.0.0.1:5000/infoDex_navigation/'+ name);
        response = await response.json();

        infoDex_log.innerHTML += 'Data retrieved.<br>';
    } catch(error) {
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
    console.log("Updatetermianl info", data);

    currLocation.innerText = data.location;
    money.innerText = `Money:  ${data.money}`;
    debt.innerText = `Debt:  ${data.debt}`;
    date.innerText = data.date;

    infoDex_log.innerHTML += `Your position: ${await data.location}<br>`;
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
            console.log(object.target.value);
            flyto(username, object.target.value);
        });

        listOfDestinations.append(dest);
      //  await initMap();
    }
}
async function flyto(name, airport) {
    const flight = await fetch(`http://127.0.0.1:5000/navigation.${airport}.${name}`);
    console.log(await flight.json());
    await printAirports(username);
}

/////////////////////////////////////////////////////////////



/// only for development: should be removed after >> 


console.log("Username in the bottom:> " + username)

printAirports(username);
initMap();


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

    console.log('quest started', click)
    const info = await questCaller(username);
    await updateTerminal(username);

    infoDex_log.innerHTML += `${await info[1]}<br>`;
})
