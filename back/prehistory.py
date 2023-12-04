'''Pelin alussa pelaajalle kerrotaan, että hän on velkaa paikalliselle monacolaiselle
jäätelöauton kuljettajalle. Pelaajan pitää lähteä omalla pienlentokoneellaan lentämään
ympäri Eurooppaa ja ansaitsemaan rahaa pelaamalla blackjackia laittomilla kasinoilla.
Pelaajan ei tarvitse osata blackjackin sääntöjä etukäteen. Jännitystä pelaajalle tuovat
matkan varrella erilaiset yllätykset. Kun pelaaja saa kasaan tarpeeksi rahaa, hänen
tulee matkustaa takaisin Monacoon maksamaan velat.
'''
from functions import general_functions as g_func

#Yleisiä ohjeita alkuun
def get_instructions():
    print('''
    
########## Maksa-Velat projekt ############

This game is made by using Python 3 programming language
and SQL databases. 

Commands are used for the game's controls. 
Typically, it is recommended to wait for terminal to 
print all needed data before pressing any buttons.

Text prompt examples are shown in boxes below
representing how commands look like in an
actual game.

When the game show the prompt:
+============================+
|[game prompt] Y/N:          |
+============================+

Y(y) will mean "Yes" and N(n) Will mean "No".

When the game prompts [ENTER], it means that you should press Enter.
(contextually)
+-----------------------+
|Wanna gamble? [ENTER]/N|
+-----------------------+

In the example above, press enter to play Black Jack.
If N is entered, you won't play Black Jack.

You have 2 primary parameters to follow:
Your money, and Your Debt.

// TRAVEL:
At every airport, you will have 9 different cities to travel to.
Each flight costs you 50$
(except for situations when you have free 300 L of aviation fuel).

To win the game, you will have to earn enough money
to pay off the debt.

To travel to another city, type the code of the city.
+============================+
|Your money amount: 1000 $   |
|Your Debt: 5000 $           |
|Where you would like to fly?|
|                            |
|(BE) Bern, Switzerland      |
|(RO) Rome, Italy            |
|(BA) Barcelona, Spain       |
|(WA) Warsawa, Poland        |
|(PA) Paris, France          |
|(VI) Vienna, Austria        |
|                            |
|> BE                        |
+============================+
If you type BE, just like in the example above,
you will travel to Bern, Switzerland. 

// Blackjack:
At some cities, you will have the opportunity to play Black Jack
at illegal casinos. That's the only way you know how to make money. 
+===================================+
|Do you want to play blackjack? Y/N |
+===================================+
To play Black jack, type Y(y).

You are only allowed to play 3 hands of Black Jack at the same casino at a time.

Blackjack features "previous bet memory".
 
When you have played at least one hand, press ENTER when the game prompts for a bet
to use the previous one. If you press ENTER on your first hand
however, the bet will be set default, or 20% of your current money capped at 200$.
So, if you have 123$, the bet will be: 123$ * 0.2 == 25$(always rounded) and if you have 3000 it will be 200$, not 600$.

At the start of each game in casinos, you will be prompted to view rules:
+----------------------------------+
| View rules of Black Jack? Y/N:   |
+----------------------------------+
Type Y(y) to view complete rules of black jack.


// Random encounters

During Your journey around the Europe, you might encounter
"interesting" people and situations. Some of them might be sketchy, so
be cautious. 
''')


def get_prehistory():
    print('''
    It's spring 1997 in Monaco. Last winter you got into gambling and racked up some debt. Now the local debt collector 
    "The Ice cream truck driver" has run out of patience and you just haven't hit it big yet.
    All you have is 500$ and that's not nearly enough to pay off your debt.
    You decide to take your small airplane and fly around Europe to play Blackjack at illegal casinos,
    since gambling and casinos have worked out so well for you so far.
    But this time you're confident you will win back all the money so you can return to Monaco and pay off your debts.
    This time for sure!
    ''')
