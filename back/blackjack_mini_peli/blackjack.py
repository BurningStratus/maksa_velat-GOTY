import random
from back.functions import general_functions as g_func
# The first version of the black jack game. Now it is not used anymore
# korttipakka
deck_of_cards = [
    "ACE", "ACE", "ACE", "ACE",
    "J", "Q", "K", "J",
    "Q", "K", "J", "Q",
    "K", "J", "Q", "K",
    "2", "2", "2", "2",
    "3", "3", "3", "3",
    "4", "4", "4", "4",
    "5", "5", "5", "5",
    "6", "6", "6", "6",
    "7", "7", "7", "7",
    "8", "8", "8", "8",
    "9", "9", "9", "9",
    "10", "10", "10", "10"
]


def get_cards(cards):
    monikko = ""
    for i in range(0, len(cards)):
        if i < len(cards) - 1:
            monikko += f"{cards[i]}, "
        else:
            monikko += cards[i]
    return monikko


# Palauttaa kortin korttipakalta
"""@DeprecationWarning
def get_a_card(cards):
    if len(cards) != 0:
        card = cards.pop(0)
        return card
    else:
        print("Out Of Card")
        return 0"""


# Lisätään otettu kortti pelaajan/diilerin korttipakan ja lisätään pisteitä
def get_a_card(card_index, who):
    card = deck_of_cards[card_index]
    who.append(card)
    if card == "K" or card == "Q" or card == "J":
        return 10
    elif card == "ACE":
        return 1
    else:
        return int(card)


def ask_bet():  # Kysytään pelaajalta panos
    choice = input("Your bet: ")
    # Alle käsitellään että käyttäjä vain pysty syöttämään numero ei mitään muuta
    if choice.isdigit() or choice[1:].isdigit():
        if int(choice) <= 0:
            print("A bet can't be 0 or lower than zero")
            ask_bet()  # Toistetaan funktio uudelleen
        else:
            choice = int(choice)
            return choice
    else:
        print("A bet can be only a number!")
        ask_bet()  # Toistetaan funktio uudelleen

def help_caller():
    print('''
??????????????////Rules of BlackJack////??????????????
- J, Q, K have the value of 10.
- A has the value of 1.

- Winner is the one with the sum of the cards closer to 21.
- Both the Player and the Dealer gain 2 cards at the start of the game.
- One of the Dealer's card is disclosed until the Player chooses to "Stay".
- Player can choose to "Stay" or to take more cards.
- Player can take as many cards as they want
- When player is satisfied with their cards or "hand",
- the Dealer opens their second card.
- If sum of cards is > 21, the player(or Dealer) is "busted"
- if both the Dealer and the Player have sum < 21, 
- the one whose sum is closer to 21, wins.
/////////////////////////
When the prompt is shown:
    Stay? Y/N: 
To stay, type "Y", to Take a card, type "N".
/////////////////////////
??????????????????????????????????????????????????????
    ''')


######################################################################################################################
# Pää ohjelma
# Jos totta siis peli loppu
def start_blackjack(screen_name):
    game_over = False
    while not game_over:  # Peli alkaa tästä
        random.shuffle(deck_of_cards)  # sekoitetaan korttipakan
        dealer = 0  # Diilerin alkupointti
        dealer_cards = []
        player = 0  # Pelaajan alkupointti
        player_cards = []
        bet_money = 0  # Kolikoitan määrä
        print(f"Player money: {g_func.get_player_money(screen_name)}$")  # Tulostetaan pelaajan raha
        bet = ask_bet()
        bet_money += bet  # tallennetaan panos
        g_func.update_money(f"-{bet}",screen_name)  # minuus pelaajan raha
        card_index = 0
        times = 0  # jos times on 2 se tarkoittaa että  jokaisella(diilerillä ja pelaajalla) ovat 2 korttia. Käytän tämä sen
        # varten että, pelaaja ei saa nähdä diilerin korttien summa toinen kierros alkaen. Eli pelaaja saa nähdä diilerin
        # korttisumman toka kierroksen asti.
        # Todo: Lisätä lisää kommentteja
        # Todo: Optimoida
        while True:
            if card_index > 51:
                card_index = 0
            # Kortti pelaajalle
            player += get_a_card(card_index, player_cards)
            card_index += 1  # seuraava kortti

            # Kortti diilerille
            if len(dealer_cards) < 2:
                dealer += get_a_card(card_index, dealer_cards)
                card_index += 1
            times += 1
            if times >= 2:
                print(f"Player: {get_cards(player_cards)}")
                print(f"Dealer: {dealer_cards[0]}, ?")
                print()
            if player > 21:
                print(f"Player: {get_cards(player_cards)}")
                print(f"Dealer: {get_cards(dealer_cards)}")
                print()
                print("YOU LOST!")
                break
            elif times >= 2:
                choice = input("Do you want to open up? Y/N:\n")
                if choice.upper() == "Y":
                    while dealer <= 16:
                        dealer += get_a_card(card_index, dealer_cards)
                        card_index += 1
                    print(f"Player: {get_cards(player_cards)}")
                    print(f"Dealer: {get_cards(dealer_cards)}")
                    if dealer > 21:
                        print("You Won!")
                        g_func.update_money(f"{bet_money * 2}", screen_name)
                        break
                    if player > dealer:
                        print("You Won!")
                        g_func.update_money(f"{bet_money * 2}", screen_name)
                    elif player == dealer:
                        print("Nothing won, nothing lost... at least this time")
                        g_func.update_money(f"{bet_money}", screen_name)
                    else:
                        print("YOU LOST!")
                    bet_money = 0
                    times = 0
                    break
                elif choice.upper() == "N":
                    print("Continue to Play Dealer!")
        choice = input("Do u want to play again? Y/N:\n")
        if choice.upper() == "N":
            print("See ya!")
            print(f"Player money: {g_func.get_player_money(screen_name)}$")
            game_over = True
