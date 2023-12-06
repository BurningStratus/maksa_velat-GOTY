
const usrname = prompt('What was your name?');



let date = document.getElementById('date');
let currLocation = document.getElementById('location');
let money = document.getElementById('money');
let debt = document.getElementById('debt');
// let airports = document.querySelectorAll('.destination');

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

async function printAirports() {
    const airports = await updateTerminal(usrname);
    const dest = document.querySelectorAll('.dest');
    for (let i = 0; i < dest.length; i++) {
        dest[i].innerText = airports[i];
    };

};
printAirports()
updateTerminal(usrname);

