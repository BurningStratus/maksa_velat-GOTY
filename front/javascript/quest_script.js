
// quests
/*
<dialog id="quest_box">
                <span id="quest_close">X</span>
                <img id="quest_img">
                <p id="quest_box_text"></p>

                <button id="quest_yes"></button>
                <button id="quest_no"></button>
            </dialog>
*/
const dataHolder = document.getElementById('quest');


// used for checking the button, where quest name comes when quest is available
dataHolder.addEventListener('click', () => {
    console.log("dataholder check");

    const holder = dataHolder.value;
    console.log(holder);
    const quest_head = holder[0] + holder[1] + holder[2] + holder[3];
    // MONA
    console.log(quest_head);
    questCaller(quest_head)
})

// checks quest header and calls according quest
async function questCaller(dataHolder) {;

    // MONA_quest or FUND_randm
    switch (dataHolder) {
        case 'MONA':
            console.log(dataHolder, "dataholder");
            await MonacoCaller(username);
        break;
        case 'VATC':
            await VaticanCaller(username);
            break;
    }
}

// MONACO QUEST
async function MonacoCaller(screen_name) {

    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // has to add pics to img box

    // logger
    const infoDex_log = document.getElementById('infoDEX_log');

    butt_no.innerText = "I have no time for this.";
    butt_yes.innerText = "Make a call";

    text_box.innerText = `QUEST TEXT HERE`; // `` backtick is multiline string.

    // showmodal

    console.log(questbox);
    questbox.showModal();

    butt_no.addEventListener('click', async () => {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA0`);
        resp = await complete.json();
        
        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${await info[1]}<br>`;
        info_log = resp[1]
        questbox.close();
    });
    butt_yes.addEventListener('click', async () => {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA1`);
        resp = await complete.json();
        info_log = resp[1];
        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${await info[1]}<br>`;
        questbox.close();
    });
    
    questbox.close();
}
//
questCaller()
