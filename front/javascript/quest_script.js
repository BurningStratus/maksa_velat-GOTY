
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
async function questCaller(dataHolder) {

    // MONA_quest or FUND_randm
    switch (dataHolder) {
        case 'MONA':
            console.log(dataHolder, "dataholder");
            await QuestCaller(username, "MONA");
            break;
        case 'VATI':
            await QuestCaller(username, "VATI");
            break;
        case 'WARS':
            await QuestCaller(username, "WARS");
            break;
        case 'DUBL':
            await QuestCaller(username, "DUBL");
            break;
        case 'MADR':
            await QuestCaller(username, "MADR");
            break;
        case 'OSLO':
            await QuestCaller(username, "OSLO");
            break;
        case 'BUCH':
            await QuestCaller(username, "BUCH");
            break;
        case "BLAC":
            await QuestCaller(username, "BLAC");
            break;
        case 'BLOW':
            await QuestCaller(username, "BLOW");
            break;
        case 'BAND':
            await QuestCaller(username, "BAND");
            break;
        case 'FUND':
            await QuestCaller(username, "FUND");
            break;
        case 'PLAN':
            await QuestCaller(username, "PLAN");
            break;
        case 'ECOA':
            await QuestCaller(username, "ECOA");
            break;
        case 'CHES':
            await QuestCaller(username, "CHES");
            break;
    }
}

// MONACO QUEST
async function QuestCaller(screen_name, location) {

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

    switch (location) {
        case "MONA":
            butt_no.innerText = "I have no time for this.";
            butt_yes.innerText = "Make the call";

text_box.innerText = `"Rich" people problems, Monaco
Since you will be away for a while after receiving the message from the debt collectors, 
it might be a bright idea to tell everything to your love interest.
Would you like to make a call?`; // `` backtick is multiline string.
        // showmodal

        console.log(questbox);
        questbox.showModal();

        butt_no.addEventListener('click', async () => {
            // if no was pressed.
            const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA0`);
            resp = await complete.json();
            
            info_log = resp[1]

            await updateTerminal(screen_name);
            infoDex_log.innerHTML += `${info_log}<br>`;
            // TODO oncomplete: removeeventlisteners
            questbox.close();
        });
        butt_yes.addEventListener('click', async () => {
            // if YES was pressed.
            const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA1`);
            resp = await complete.json();
            
            // info_log is a row in terminal.
            info_log = resp[1];

            await updateTerminal(screen_name);
            infoDex_log.innerHTML += `${info_log}<br>`;
            questbox.close();
    });
            break;
        case "POLN":
            completion_string = 'WARS';
            // 
            butt_no.innerText = "I'll do this myself.";
            butt_yes.innerText = "Find mechanic.";
            
text_box.innerText = ` quest text `; // `` backtick is multiline string.
        
            // showmodal
        
            console.log(questbox);
            questbox.showModal();
        
            butt_no.addEventListener('click', async () => {
                // if no was pressed.
                completion_string += "0"
            });
            butt_yes.addEventListener('click', async () => {
                // if YES was pressed.
                const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.WARS1`);
                resp = await complete.json();
                
                // info_log is a row in terminal.
                info_log = resp[1];
        
                await updateTerminal(screen_name);
                infoDex_log.innerHTML += `${info_log}<br>`;
                questbox.close();
            });
    }
    questbox.close();
}


//
questCaller()
