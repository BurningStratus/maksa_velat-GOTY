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
You have 2 primary parameters to follow: Your money and Your Debt. 
The goal of the game is to earn enough money to pay off your debt. You take off on your tiny airplane and travel 
around Europe to play Blackjack at illegal casinos. That's what got you into debt in the first place, 
but that's also the only way you can make money at the moment. 


TRAVEL: 
At every airport, you will have 9 different cities to travel to. 
Each flight costs you 50$. 
You can choose your destination on the list next to the map. Click the buttons next to the cities to travel there. 

BLACKJACK: 
At some cities, you will have the opportunity to play Blackjack
at illegal casinos. The game prompts: 

" Do you want to play blackjack? YES / NO "
To play Blackjack, click 'YES'. 

You are allowed to play 3 hands of Blackjack at the same casino at a time. But you can always com back later... 

Blackjack features "previous bet memory". 
 
When you have played at least one hand, click 'BET' when the game prompts for a bet 
to use the previous one. If you click 'BET' on your first hand 
however, the bet will be set default, or 20% of your current money capped at 200$. 
So, if you have 123$, the bet will be: 123$ * 0.2 == 25$(always rounded) and if you have 3000 it will be 200$, not 600$. 

At the start of each game in casinos, you will be prompted to view rules: 

 " View rules of Blackjack? YES / NO " 

Click 'YES' to view complete rules of blackjack. 

RANDOM ENCOUNTERS: 

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
