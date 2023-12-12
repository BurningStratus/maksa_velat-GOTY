
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

let text_box = document.getElementById('quest_box_text');
let img = document.getElementById('quest_img');
let butt_yes = document.getElementById('quest_yes');
let butt_no = document.getElementById('quest_no');



// used for checking the button, where quest name comes when quest is available
dataHolder.addEventListener('click', () => {
    console.log("dataholder check");

    const holder = dataHolder.value;
    console.log(holder);
    const quest_head = holder[0] + holder[1] + holder[2] + holder[3];
    // MONA
    console.log(quest_head);
    questCaller(quest_head);
})

// checks quest header and calls according quest
async function questCaller(dataHolder) {
    // elements
    // MONA_quest or FUND_randm
    switch (dataHolder) {
        case 'MONA':
            console.log(dataHolder, "dataholder");
            await MonacoCaller(username);
            break;
        case 'VATI':
            await VaticanCaller(username);
            break;
        case 'WARS':
            await PolandCaller(username);
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
            await FundraiserCaller(username);
            break;
        case 'PLAN':
            await PlantCaller(username);
            break;
        case 'ECOA':
            await QuestCaller(username, "ECOA");
            break;
        case 'CHES':
            await QuestCaller(username, "CHES");
            break;
    }
}

// returns list of elements:
// 0 == quest text, 1 == button No, 2 == button Yes, 3 == image.
function questElements() {
    text_box = document.getElementById('quest_box_text');
    img = document.getElementById('quest_img');
    butt_yes = document.getElementById('quest_yes');
    butt_no = document.getElementById('quest_no');

    text_box.innerText = '';
    img.url = '';
    butt_no = '';
    butt_yes = '';

    return [text_box, butt_no, butt_yes, img];
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

    // stage 1
    const quest_text1 = `"Rich" people problems, Monaco
Since you will be away for a while after receiving the message from the debt collectors, 
it might be a bright idea to tell everything to your love interest.
Would you like to make a call?`;
    // yes and no
    const buttonNo_text1 = "I have no time for this.";
    const buttonYes_text1 = "Make the call";
    const img_1 = "../img/img_quests/MONA.png";

    // has to add pics to img box
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)
    
    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;

    img.url = img_1;

    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendMonaco0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA0`);
        resp = await complete.json();
        
        info_log = resp[1]
        
        // update terminal lines.
        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        
        //oncomplete: removeeventlistener
        butt_no.remove
        butt_yes.remove
        
        questbox.close();
    });

    butt_yes.addEventListener('click', async function sendMonaco1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MONA1`);
        resp = await complete.json();
        
        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();
        
        butt_no.remove
        butt_yes.remove
    });

}
// WARSAWA QUEST
/*
async function PolandCaller(screen_name) {
    let completion_string = "";
    let quest_stage = 0;

    const questbox = document.getElementById('quest_box');
    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.createElement('button')
    butt_yes.id = 'quest_yes';
    const butt_no = document.createElement('button');
    butt_no.id = 'quest_no';
    let info_log;
    let resp;
    
    const quest_text1 = `Example`;
    const buttonNo_text1 = "I'll do this myself.";
    const buttonYes_text1 = "Find mechanic.";
    const img_1 = "../img/img_quests/.png";

    const quest_text2 = ``;
    const buttonNo_text2 = "";
    const buttonYes_text2 = "";
    const img_2 = "";

    // img.url = "path to pic";
    img.alt = "Warsaw quest";
    text_box.innerText = quest_text1;

    // showmodal
    console.log(questbox);
    questbox.showModal();

    function polandStage1() {

    }

    function polandStage2{} {

    }

    function polandStage3 {} (

    )


    butt_no.addEventListener('click', function polandStage1() {
        // if no was pressed.
        completion_string += "0";
        questElements();
        console.log('yes');

        text_box.innerText = quest_text2; 
        butt_no.innerText = buttonNo_text2;
        butt_yes.innerText = buttonYes_text2;

        butt_no.removeEventListener('click', )

        // if yes was pressed. sequence:(YES, NO)
        butt_no.addEventListener('click', async function polandStage2() {
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.WARS01`);
        resp = await complete.json();
        
        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();

        butt_no.removeEventListener('click', polandStage1());
        butt_no.removeEventListener('click', polandStage1());
        butt_yes.removeEventListener('click', polandStage2())
        })

        butt_yes.addEventListener('click', async function polandStage3() {
            completion_string += "1";
            questElements();
            console.log('yes');

            text_box.innerText = quest_text3; 
            butt_no.innerText = buttonNo_text3;
            butt_yes.innerText = buttonYes_text3;

            
            butt_no.addEventListener('click', async function polandStage4() {
                butt_no.removeEventListener('click', polandStage4());

            })

        })

    });


    // if YES was pressed, quest is completed, so fetch is sent.
    butt_yes.addEventListener('click', async function sendPoland1() {
        
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.WARS1`);
        resp = await complete.json();
        
        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();
        butt_yes.removeEventListener('click', sendPoland1());
        butt_no.removeEventListener('click', polandStage1());


        });

}
*/

// Plant the Trees QUEST
async function WeedCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const quest_text1 = `Plant the trees
In the city you meet a group of young energetic people. 
They are on their way to plant some trees with a local organisation. 
Would you like to join them?`;
    // yes and no
    const buttonNo_text1 = "I have no time for this.";
    const buttonYes_text1 = "Let's go plant some trees!";
    const img_1 = "../img/img_quests/PLAN.png";

    // has to add pics to img box
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)

    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;

    img.url = img_1;

    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendWeed0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.WEED0`);
        resp = await complete.json();

        info_log = resp[1]

        // update terminal lines.
        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;

        //oncomplete: removeeventlistener
        butt_no.remove
        butt_yes.remove

        questbox.close();
    });

    butt_yes.addEventListener('click', async function sendWeed1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.WEED1`);
        resp = await complete.json();

        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();

        butt_no.remove
        butt_yes.remove
    });

}

// Fundraiser QUEST
async function FundraiserCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const quest_text1 = `Fundraiser 
On the street you notice a group of people dressed up all fancy. 
They tell you that there is a big fundraiser event  for girls’ education about to begin and 
the method of raising the funds is blackjack. After hearing that you are basically a blackjack pro, 
they ask you to join them. You are definitely not dressed appropriately. 
But on the other hand you have always been passionate about women’s rights. Will you join them?
The bet is 100$.
`;
    // yes and no
    const buttonNo_text1 = "I have no time for this.";
    const buttonYes_text1 = "Let's make some money for the girls!";
    const img_1 = "../img/img_quests/FUND.png";

    // has to add pics to img box
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)

    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;

    img.url = img_1;

    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendFundraiser0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.FUND0`);
        resp = await complete.json();

        info_log = resp[1]

        // update terminal lines.
        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;

        //oncomplete: removeeventlistener
        butt_no.remove
        butt_yes.remove

        questbox.close();
    });

    butt_yes.addEventListener('click', async function sendFundraiser1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.FUND1`);
        resp = await complete.json();

        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();

        butt_no.remove
        butt_yes.remove
    });

}
// questCaller()
