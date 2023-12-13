
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
            await DublinCaller(username);
            break;
        case 'MADR':
            await MadridCaller(username);
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
            await BlownEngineCaller(username);
            break;
        case 'BAND':
            await BanditCaller(username);
            break;
        case 'FUND':
            await FundraiserCaller(username);
            break;
        case 'WEED':
            await WeedCaller(username);
            break;
        case 'ECOA':
            await EcoActivistCaller(username);
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
    const img_1 ="../img/img_quests/PLAN.jpg";

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
    const img_1 = "../img/img_quests/FUND.jpg";

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

// Madrid QUEST
async function MadridCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const quest_text1 = `Wine delivery
As you arrive to Madrid you're approached by a shady looking person that offers you easy money doing a delivery.
You receive a crate full of cheap looking wine to take to Lisbon,
Portugal and told that you'll be receiving your payment upon arrival.
Will you though? Well you already got the wine so might as well find out!`;
    // yes and no
    const buttonNo_text1 = "No! I'm giving the wine back.";
    const buttonYes_text1 = "Portugal sounds nice. Let's go!";
    const img_1 = "../img/img_quests/MADR.png";

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

    butt_no.addEventListener('click', async function sendMadrid0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MADR0`);
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

    butt_yes.addEventListener('click', async function sendMadrid1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.MADR1`);
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

// Blown Engine QUEST
async function BlownEngineCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const quest_text1 = `Problems with the engine
You have been having some troubles with your airplane's engine. You find a friendly mechanic. 
Luckily they tell you the repairs will cost you only 100$. There is also a chance to convert the engine 
so that it would run on ethanol instead of kerosene. The conversion would cost you only 50$ on top of 
the 100$ for the needed repairs and the ethanol would cost you just a bit more kerosene(65$ per flight). 
Are you an environmental hero or will you continue to fly with kerosene?`;
    // yes and no
    const buttonNo_text1 = "Only the needed repairs, thanks..";
    const buttonYes_text1 = "Let's do it for the polar bears!";
    const img_1 = "../img/img_quests/BLOW.jpg";

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

    butt_no.addEventListener('click', async function sendBlown0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.BLOW0`);
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

    butt_yes.addEventListener('click', async function sendBlown1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.BLOW1`);
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

// Vatican QUEST
async function VaticanCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;
    // stage 1
    const img_1 = "../img/img_quests/VATI.jpg";
    img.url = img_1;
    const quest_text1 = `Pope in danger
    You got to Vatican city, but something seems different from before.
    The place you knew held the casino before has been raided by the police.
    The Pope approaches you in the commotion and asks you to take him to Sarajevo to escape the raid.`

    // yes and no
    const buttonNo_text1 = "I have no time for this.";
    const buttonYes_text1 = "Of course I'll help my old pal!";

    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)

    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;



    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendVatican0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.VATI0`);
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

    butt_yes.addEventListener('click', async function sendVatican1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.VATI1`);
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

// Dublin QUEST
async function DublinCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const img_1 = "../img/img_quests/dublin_quest1.png";
    img.url = img_1;
    const quest_text1 = `Dublin, Ireland
    You saw a rainbow and decided to head outside to see if you could find its end.
    You stumble upon a peculiar looking bearded little man wearing green. 
    He congratulates you for finding him and disappears before you could properly react,
    leaving behind a small pot. Will you take a look inside the pot?`;
    // yes and no
    const buttonNo_text1 = "No, it's probably full of...rubbish.";
    const buttonYes_text1 = "Let's take a look.";


    // has to add pics to img box
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)

    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;



    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendDublin0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.DUBL0`);
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

    butt_yes.addEventListener('click', async function sendDublin1() {
        // if YES was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.DUBL1`);
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
// Bandit QUEST
async function BanditCaller(screen_name) {
    // elements
    const questbox = document.getElementById('quest_box');

    const text_box = document.getElementById('quest_box_text');
    const img = document.getElementById('quest_img');
    const butt_yes = document.getElementById('quest_yes');
    const butt_no = document.getElementById('quest_no');
    let info_log;
    let resp;

    // stage 1
    const img_1 = "../img/img_quests/BAND.png";
    img.url = img_1;
    const quest_text1 = `Bandit
    Oh no! You got robbed. Luckily you only had 200$ in your pockets.`;
    // yes and no
    const buttonYes_text1 = "Wrong place...";
    const buttonNo_text1 = "...at the wrong time.";

    // has to add pics to img box
    // logger
    const infoDex_log = document.getElementById('infoDEX_log');
    console.log(location)

    text_box.innerText = quest_text1;
    butt_no.innerText = buttonNo_text1;
    butt_yes.innerText = buttonYes_text1;



    // showmodal
    console.log(questbox);
    questbox.showModal();

    // event listeners are connected to buttons.
    // on quest_data send, event listeners should be removed to avoid problems,
    // since there will be many functions connected to the same button.

    butt_no.addEventListener('click', async function sendBandit0() {
        // if no was pressed.
        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.BAND0`);
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

    butt_yes.addEventListener('click', async function sendBandit1() {
        // if YES was pressed.

        const complete = await fetch(`http://127.0.0.1:5000/quest/${screen_name}.BAND1`);
        resp = await complete.json();

        // info_log is a row in terminal.
        info_log = resp[1];

        await updateTerminal(screen_name);
        infoDex_log.innerHTML += `${info_log}<br>`;
        questbox.close();
    butt_yes.remove;

    });

}

// questCaller()
