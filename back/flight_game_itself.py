'''
######### INDEX ##########

1. IMP = imports
2. MAIN = main program
##########################
'''
# ###
# MAIN OBJ: TODO establish communication http-client <=> flask-server.
# TODO: don't commit general_functions.py and sql_connection.py.
# ###


### IMP imports

from functions import general_functions as g_func
from functions import quest_functions as q_func
from functions import casino_flags

import prehistory
from blackjack_mini_peli import blackjack_iteration as black_jack
from colorama import Back, Fore
from SQL_Scripts import load_database


###


# MAIN
load_database.load_events()  # Loading events...
g_func.print_game_name()     # Printing game name
prehistory.get_prehistory()  # Printing Pre-History

# choice = input("Do you want a tutorial? Y/N ")
# if choice.upper() == "Y":
##
#     prehistory.get_instructions()

print(Fore.LIGHTBLUE_EX, "press Enter to continue...", Fore.RESET)
input()
# Asking from player its nickname

screen_name = input("From all due to stress I forgot my own name...\n"
                    "*Starts to check his identity card*\n"
                    "OH I FOUND IT, and my name is ...\nWrite here > ")

print(f"My name is {screen_name}...")

# Difficulty level
debt = int(input("Lets see how much debt I need to pay...\nWrite here > "))

print(f"{debt} DOLLARS!? That's really big debt I own...\nOkay let's get started...")

g_func.add_player(screen_name, debt)

game_over = False
lose = False
win = False


while not game_over:

    player_money = g_func.get_player_money(screen_name)
    
    print(Fore.LIGHTCYAN_EX, f"Your money amount: {player_money} $", Fore.RESET)
    print(Fore.RED, f"Your Debt: {debt} $", Fore.RESET)

    q_func.do_quest(screen_name)
    player_location = g_func.get_player_location(screen_name)

    if g_func.can_play_blackjack(screen_name):
        choice = input("Do you want to play blackjack? Y/N ")
        if choice.upper() == "Y":
            casino_flags.get_casino_flag(player_location)  # prints casino flag
            black_jack.play(screen_name)  # blackjack game starts here
        else:
            print("You decided not to play blackjack today...")
    else:
        print("Seems that local casino got closed again...")
    if g_func.get_player_money(screen_name) >= debt and player_location == 'MO':
        g_func.get_epilogue()
        win = True
        break
    elif g_func.get_player_money(screen_name) <= 0:
        lose = True
        break
    print(Fore.LIGHTCYAN_EX, f"Your money amount: {g_func.get_player_money(screen_name)} $", Fore.RESET)
    print(Fore.GREEN, "Where you would like to fly?(Write down two letter word which you can find in brackets "
                      "it will mean that you chose that country to fly to)", Fore.RESET)
    g_func.print_9_nearest_airports(player_location)
    icao = input("Write Here > ")
    g_func.fly_to(icao, screen_name)
if win:
    print(Back.YELLOW, "CONGRATULATIONS! YOU WON THE GAME! THANKS FOR PLAYING MAKSA_VELAT!"
                       " WE HOPE THAT YOU ENJOYED IT!\n"
                       "THIS GAME WAS MADE BY D&D GROUP, ALL RIGHTS ARE PROTECTED. 2023", Back.RESET)
elif lose:
    g_func.gameover()
    print(Back.YELLOW, "THANKS FOR PLAYING MAKSA_VELAT! WE HOPE THAT YOU ENJOYED IT!\n"
                       "THIS GAME WAS MADE BY D&D GROUP, ALL RIGHTS ARE PROTECTED. 2023", Back.RESET)

