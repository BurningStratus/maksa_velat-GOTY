# Kokeilu siitä että onnistuuko push

# Vatikaani quest
# Saavut Vatikaaniin ensin
from functions import general_functions as g_func


def vatican_escape_caller(screen_name):
    print('''
You got to Vatican city, but something seems different from before.
The place you knew held the casino before has been raided by the police.
The Pope approaches you in the commotion and asks you to take him to Sarajevo to escape the raid.
''')
    pope = input("Will you help the Pope in his escape? Y/N: ")

    if pope.upper() == "Y":
        print('''
You decided to help the Pope and flew to Sarajevo without issue. The pope rewarded you with 1000$ as a sign of gratitude
''')
        print("Where would you like to go next?")
        g_func.update_money("1000", screen_name)  # +1000 $
        g_func.fly_to("SA", screen_name, True)  # Change Location to Sarajevo
    elif pope.upper() == "N":
        print('''
You left the pope to fend for themselves as the raiding officers body slam him to the ground. Are you happy?
''')
        print("Where would you like to go next?")
    return


# vatican_escape_caller()

# Irlanti easter egg
# Saavut Irlannin kentälle
def dublin_adventure_caller(screen_name):
    gold_pot = input("You arrived to Ireland, what would you like to do? Y = Explore/N = Play black jack ")

    if gold_pot.upper() == "Y":
        print('''
You saw a rainbow and decided to head outside to see if you could find its end.
You stumble upon a peculiar looking bearded little man wearing green. 
He congratulates you for finding him and disappears before you could properly react,
leaving behind a small pot filled with gold coins 'gain 750$' 
''')
        g_func.update_money("750", screen_name)

    if gold_pot.upper() == "N":
        print("More black jack, how lovely!")
    return


# dublin_adventure_caller()

# Madridin quest
# Saavut Madridin kentälle

def madrid_wine_smuggler_caller(screen_name):
    print('''
As you arrive to Madrid you're approached by a shady looking person that offers you easy money doing a delivery.
''')
    cheap_wine = input("Will you make the delivery? Y/N ")

    if cheap_wine.upper() == "Y":
        print('''
You receive a crate full of cheap looking wine to take to Lisbon,
Portugal and told that you'll be receiving your payment upon arrival
"Will you though? Well you already got the wine so might as well find out!

You get to Lisbon and an even shadier looking person takes the delivery and hands you a measly 10$
''')
        g_func.update_money("10", screen_name)
        g_func.fly_to("LI", screen_name, True)

    if cheap_wine.upper() == "N":
        print('''
The shady guy scoffs at you and mutters that you looked smarter than you were under their breath as they leave.
''')

    return


# madrid_wine_smuggler_caller()

def oslo_quest(screen_name):
    print('''
You're approached by a smug-looking, well dressed person on the airport of Oslo right as you land.
They say that you strike them as an interesting person and asks if you're down for a little fishing race...
and of course a bet on top of it.
The race would take place on the Arctic sea, the one to catch the bigger fish would be declared the winner.
Both get a large fishing ship and a crew, provided and paid for by the well dressed smug person. The bet would be 200$.
Will you take the bet?
''')
    fishing_race = input("Y = Absolutely, lets get some good pictures with the catch while we're at it!/"
                         "N = This seems too fishy and I won't take the bait. ")

    if fishing_race.upper() == "Y":
        print('''
You embark with your crew at dawn because that's the time fish are most active.
The trip started quiet and you start to feel nervous, until you spot something a bit further away, a whale.
A catch that big would win the race for sure right?
''')
        whale = input("Do you tell your crew to go after the whale? Y/N: ")
        if whale.upper() == "Y":
            print('''
You go after the whale, your experienced crew harpoons the beast and you drag the carcass to port.
Your opposing party looks at you in disbelief, but soon turns to laughter as they ask

- That's not a fish now is it?

You lose the bet to a fish that's not even that big! You reluctantly hand over your 200$ and leave the port.
The smug person thanks you for the race as you leave.
''')
            g_func.update_money("-200", screen_name)
        if whale.upper() == "N":
            print('''
You feel unsure of your decision, but keep casting nets into the sea, eventually catching a moderately big red snapper.
In port you weigh your catches and you win the bet just barely.
The smug person laughs and hands you the 200$ and thanks you for the good time.
''')
            g_func.update_money("200", screen_name)

    if fishing_race.upper() == "N":
        print("The person seems a bit disappointed, but leaves without a fuss. What would you like to do next?")
    return

# oslo_quest()
