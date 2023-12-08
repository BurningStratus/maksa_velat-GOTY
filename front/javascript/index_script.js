const listAirports = document.getElementById('dests');

let date = document.getElementById('date');
let currLocation = document.getElementById('location');
let money = document.getElementById('money');
let debt = document.getElementById('debt');

// let airports = document.querySelectorAll('.destination');
////////////////////////////////////////////////////////////
async function infoDex(name) {
    let response;
    try {
        response = await fetch('http://127.0.0.1:5000/infoDex_navigation/'+ name);
        response = await response.json();
        console.log('data retrieved. infoDex')
    } catch(error) {
        response = error.message;
        console.error('error. infoDex', response)
    }
    return response;
}
async function updateTerminal(name) {
    // to update during the game
    let date = document.getElementById('date');
    let currLocation = document.getElementById('location');
    let money = document.getElementById('money');
    let debt = document.getElementById('debt');

    const data = await infoDex(name);
    // debug
    console.log(data);

    currLocation.innerText = data.location;
    money.innerText = data.money;
    debt.innerText = data.debt;
    console.log(await data.airports);
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

        dest.append(ICAOcode, travelButton);
        dest.classList.add('travelButton');

        const ICAO = await airport.split(' ')[0];
        travelButton.innerHTML = ICAO;
        travelButton.value = ICAO;

        await travelButton.addEventListener('click', (object) => {
            listAirports.innerHTML = '';
            console.log(object.target.value);
            flyto(username, object.target.value);
        });

        listOfDestinations.append(dest);
    }
}

async function flyto(name, airport) {
    const flight = await fetch(`http://127.0.0.1:5000/navigation.${airport}.${name}`);
    console.log(await flight.json());
    await printAirports(username);
}
/////////////////////////////////////////////////////////////

printAirports(username)
