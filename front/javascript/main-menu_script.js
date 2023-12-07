
const startGame = document.getElementById('start');

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

startGame.addEventListener('click', (event) => {
    console.log('event started');
    const name = prompt('Name');
    const debt = parseInt(prompt('Debt'));
    console.log(newGame(name, debt));
})