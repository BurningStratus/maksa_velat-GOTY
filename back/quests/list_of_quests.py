from functions import general_functions as g_func

###  yleinen quest file
###  sitä voi suoraan integroida koodiiin.

# user_input_outer =  # 'outer' tarkoittaa, etta sita kaytetaan kvesteja varten, mutta ei niiden sisalla
# user_input_inner **aina** kaytetaan questien sisalla, jotta kaikki ei menisi sekaisin



# seuraavalla rivilla luku alussa on quest_id, ja sitten 'virallinen nimi'(virallinen nimi != nimi questin alussa)
# 1. STARTER QUEST
def starter_quest_caller(screen_name):
    print('''
// "Rich" people problems, Monaco
    
Since you will be away for a while after receiving the message from the debt collectors, 
it might be a bright idea to tell everything to your love interest.
    ''')
    user_input_inner = input("Would you like to make a call? Y/N: ")

    if user_input_inner.upper() == "Y":

        g_func.update_money("50", screen_name)
        print('''
\nAfter a long talk your love interest is quite 'displeased' with the situation. They write you a check for 50$ though.
You go to the nearest bank and receive 50$ with a note:
    "I hope ... debt will teach you. Still love you, ...".
Some parts of the note are incomprehensible because of the water stains on the paper. 
It's time to hit the sky. 
            ''')
    else:
        print('''
You decide that the trip won't be long enough to bother them and depart.
It's time to hit the sky.
        ''')

    return 0
    # END OF STARTER QUEST


# 2. CHESS IN GERMANY
def chess_in_germany_caller():
    print('''
"Checkers maybe?", Germany

While walking through the park in Germany, you see an old man sitting on a bench with a smoking pipe and a chess board, 
with all pieces being set up for a new game. The old man asks you to play a single game with him. 
In school you loved to play chess.
    ''')
    user_input_inner = input("Do you want to challenge him? Y/N: ")
    if user_input_inner.upper() == "Y":
        print('''
After a long and exhausting game you take a victory from the old man. He is very pleased with the game
and after you tell them about your problem, 
he tells you about leprechauns in Ireland, that give out gold for some reason.
"What a weirdo" - Was your first thought.
        ''')
    else:
        print('''
You choose to ignore the old man, because you don't have time for stupid games.
        ''')


    return 0
    # END OF CHESS IN GERMANY


# 3. POLISH INCIDENT
def polish_incident_caller(screen_name):

    g_func.update_money("-100", screen_name)
    print('''

When landing on the lane, one of your tyres pops. You land the plane no problem, since you are an experienced pilot.
Too bad that the spare tyre has been in the trunk for long enough for it rot through. 
You spend the entire day trying to navigate the city and find the tyre with the right size. 
You spend 100$ on it. 
Returning to the airport, where your plane is parked, you feel exhausted.
    ''')
    user_input_inner = input("Do you want to pay airport mechanic 200$ for him to change your tyre? Y/N: ")

    if user_input_inner.upper() == "Y":
        g_func.update_money("-200", screen_name)

        print('''
You go to the mechanic's hangar and ask him to swap a rotten tyre for a new one. 
He swiftly puts a new tyre on an old rim with seems like no effort, but with enthusiasm. 
You spend the remaining day walking around the city and looking at lots of poor people selling lots of things.
        ''')
    elif user_input_inner.upper() == "N":
        print('''
You sit through the whole evening until the night trying to change a tyre. Not a pleasant activity.
When you are finally done with the tyre, you bring the borrowed tools back to the repair hangar. 
There you spot an airport mechanic filling gas cans with kerosene. This certainly wasn't an authorized activity.
        ''')
        user_input_inner = input("He didn't notice you. Do you want to confront him? Y/N: ")

        if user_input_inner.upper() == "Y":
            print('''
When you come closer to the mechanic, he finally sees you and looks pissed. 
Since you see him engaging in not-so-legal activities, 
he tells you that he will give 100$ and 300 L of aviation fuel(1x FREE TRAVEL)
If you won't tell anyone.
            ''')
            user_input_inner = input("Contact the mechanic's superiors? Y/N: ")

            if user_input_inner.upper() == "N":
                g_func.update_money("150", screen_name)

                print('''
You decide to not to interrupt the direction of the universe, 
so you accept 100$ and 300 L of kerosene and leave with peace.
                ''')
            else:
                g_func.update_money("-100", screen_name)
                dull_value_tobe_deleted = None  # here will be money -100
                print('''
You decide that the world will be better if you tell the airport security that the mechanic is stealing the kerosene.
When you tell the patrolling guard about it, he tells you that they will 'deal' with the mechanic. 
Feeling great after doing the right thing, you go back to your motel. 
In the morning you notice that another tyre is punctured. 
Strange to see this, because it was brand-new: you changed it the day before the 'message'.
So you spend another 100$ to change it, and depart peacefully the next day.
                ''')
        else:
            print('''
You decide not to interrupt him from their daily activities, 
so you bring the tools back on their places and peacefully leave the hangar. 
Then you go back to the motel and depart the next day. 
            ''')

    return 0


# polish_incident_caller()

def black_cat_caller(screen_name):
    did_this = 0

    print('''
During preparation for departure, a black cat jumps in your machine, takes your keychain and runs away. 
You swiftly jump out and chase the cat.
You have the important keys from a plane and your home in Monaco in your pocket.
    ''')
    user_input_inner = input("Will you chase the cat? Y/N: ")

    if user_input_inner.upper() == "Y":
        did_this += 1
        print('''
Even though the cat runs quite fast, you won't lose it. You hear your keys blinging. 
        ''')
        user_input_inner = input("Continue the chase? Y/N: ")

        if user_input_inner.upper() == "Y":
            did_this += 1
            print('''
You continue to chase the cat with your keys. It runs in way that you wouldn't lose it.
            ''')
            user_input_inner = input("Are you still chasing a cat? Y/N: ")

            if user_input_inner.upper() == "Y":
                did_this += 1
                print('''
You are still chasing a cat. When you get close enough to try to catch it, 
it dodges your hand and you trip on a street. Everyone on a street heard what you think about the damn cat.
                ''')
                user_input_inner = input("Do you really need these keys?: ")

                if user_input_inner in ("Y", "y", "YES", "Yes", "yes"):
                    did_this += 1
                    print('''
Your legs hurt, you feel that you are about to collapse, and your left hand is scratched. 
Come on, this keychain isn't worth it to chase it.
                        ''')
                    user_input_inner = input("But still, will you chase the damn black cat?: ")
                    if user_input_inner in ("I Will", "I will", "Y", "y", "YES", "Yes"):
                        did_this += 1
                        print('''
After another couple of minutes of exhausting chase, cat finally lets your keys go. You retrieve your keys. 
But after a long chase, you are deep inside a foreign city on an unknown street. 
                                ''')
                        input("Press ENTER to continue...")

    if did_this >= 5:
        print('''
While walking on the street and cursing the cat, you find 500$.
Maybe the cat wasn't that bad.
        ''')
        g_func.update_money("500", screen_name)

    elif did_this < 5:
        print('''
You let the cat get away with a bunch of your keys. 
Not that there was anything important, but you are not happy either.
        ''')
    print('''
Asking people for directions and trying to understand them in a mix of local language and english 
wasn't particularly easy, but in the end you find your way back to the airport.
    ''')
    return None


def romania(screen_name):
    print('''
\nYou will meet a tall dark stranger, Romania

You arrive in beautiful Bucharest during nighttime. It's dark and you're tired, but you start heading towards 
the local illegal casino. On your way there a friendly stranger approaches you. They tell you about 
a folk dance party. Sure sounds fun, but you're quite tired. ''')
    user_input = input("Do you go to the party or follow your original plan to play blackjack tonight? \n"
                       "Y = Dance party / N = Blackjack  : ")
    if user_input.upper() == "Y":
        print('''You follow the stranger and soon you start hearing music. You arrive in a  hall full of 
dancing people. You split up with the stranger and dance with the locals. After couple of hours the stranger 
finds you and tells you it's time to go. On your way back you thank the stranger for the invite and tell them why 
you're in Romania. After hearing you have an airplane the stranger asks you to take them to Istanbul and offers you 
100$.''')
        user_input = input("Do you take the tall dark stranger to Istanbul? Or do you continue your journey alone??\n"
                           "Y = Take the stranger to Istanbul / N = Continue your journey alone : ")
        if user_input.upper() == "Y":
            print('''You landed in Istanbul with the stranger. They give you the 100$ and leave.
What would you like to do next?''')
            g_func.fly_to("IS", screen_name, True)
            # Should I make that it will cost money for player to fly to istanbul?
            g_func.update_money("100", screen_name)  # +100$
        elif user_input.upper() == "N":
            print("Maybe that's for the best. You don't really know what the stranger is up to.")
    elif user_input.upper() == "N":
        print("You decline the offer and walk on.")


def bandits(screen_name):
    print()
    print("\033[31mBandits stole from you 200$\033[0m")
    g_func.update_money("-200", screen_name)
    money = g_func.get_player_money(screen_name)
    print(f"\033[33mYou have {money}$ now.\033[0m")
    print()


'''
Plant the trees
In the city you meet a group of young energetic people. 
They are on their way to plant some trees with a local organisation. 
Would you like to join them?

if yes:
You had a nice time with the youngsters and together you planted over a thousand trees. 
That’s some good karma! And the afterparty was amazing.

seuraus: ei vaikutusta rahaan, mutta +1 päivä
----------------------------------

Fundraiser 
On the street you notice a group of people dressed up all fancy. 
They tell you that there is a big fundraiser event  for girls’ education about to begin and 
the method of raising the funds is blackjack. After hearing that you are basically a blackjack pro, 
they ask you to join them. You are definitely not dressed appropriately. 
But on the other hand you have always been passionate about women’s rights. Will you join them?

if yes:
In the beginning you placed a bet of 100$ and played better than ever, but of course all the money 
went to charity. It was all worth it because you had a blast and made some new friends.

raha -100$ ja +1 päivä
------------------------------------

Problems with the engine
You have been having some troubles with your airplane's engine. You find a friendly mechanic. 
Luckily they tell you the repairs will cost you only 100$. There is also a chance to convert the engine 
so that it would run on ethanol instead of kerosene. The conversion would cost you only 50$ on top of 
the 100$ for the needed repairs and the ethanol would cost you the same as kerosene(50$ per flight). 
Are you an environmental hero or will you continue to fly with kerosene?

if yes:
The repairs and the conversion cost you 150$. Now your dear plane is running smoothly and 
environmentally friendly :)

raha -150 tai -100

--------------------------------

All quests done:
Congratulations! You have completed three quests to make the world a better place: you planted trees, 
gave money to girls’ education and converted your airplane’s engine to run on ethanol. 
Your good deeds have been noticed by a big environmental organization and they gave you a stipend of 1500$! 

raha +1500$
'''