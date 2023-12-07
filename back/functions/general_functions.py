import sys
import time

from colorama import Fore
from geopy import distance

from SQL_Scripts import sql_connection as sql

def update_calendar(curr_date: list) -> str: # curr_date has to look like "dd/mm/yyyy", "10/04/1997"
    date = curr_date.split("/")
    day = int(date[0])
    month = int(date[1])
    year = int(date[2])

    if day < 30 and month < 12:
        # any month except DEC. Day will swap to +1( 1 4 1997 >> 2 4 1997 )
        day += 1
        
    elif day == 30 and month < 12:
        # month changes. Any, except DEC. ( 30 4 1997 >> 1 5 1997 )
        month += 1
        day = 1

    elif day == 30 and month == 12:
        # year swap. If 30 DEC, year + 1 ( 30 12 1997 >> 1 1 1998 ) 
        day = 1
        month = 1
        year += 1
    
    if len(str(day)) < 2:
        day = "0" + str(day)
    
    if len(str(month)) < 2:
        month = "0" + str(month)
    
    upd_date = str(day) + "/" + str(month) + "/" + str(year)
    return upd_date


def print_game_name():
    print(Fore.RED + """
$$\      $$\  $$$$$$\  $$\   $$\  $$$$$$\   $$$$$$\        $$\    $$\ $$$$$$$$\ $$\        $$$$$$\  $$$$$$$$\ 
$$$\    $$$ |$$  __$$\ $$ | $$  |$$  __$$\ $$  __$$\       $$ |   $$ |$$  _____|$$ |      $$  __$$\ \__$$  __|
$$$$\  $$$$ |$$ /  $$ |$$ |$$  / $$ /  \__|$$ /  $$ |      $$ |   $$ |$$ |      $$ |      $$ /  $$ |   $$ |   
$$\$$\$$ $$ |$$$$$$$$ |$$$$$  /  \$$$$$$\  $$$$$$$$ |      \$$\  $$  |$$$$$\    $$ |      $$$$$$$$ |   $$ |   
$$ \$$$  $$ |$$  __$$ |$$  $$<    \____$$\ $$  __$$ |       \$$\$$  / $$  __|   $$ |      $$  __$$ |   $$ |   
$$ |\$  /$$ |$$ |  $$ |$$ |\$$\  $$\   $$ |$$ |  $$ |        \$$$  /  $$ |      $$ |      $$ |  $$ |   $$ |   
$$ | \_/ $$ |$$ |  $$ |$$ | \$$\ \$$$$$$  |$$ |  $$ |         \$  /   $$$$$$$$\ $$$$$$$$\ $$ |  $$ |   $$ |   
\__|     \__|\__|  \__|\__|  \__| \______/ \__|  \__|          \_/    \________|\________|\__|  \__|   \__|   
                                                                                                              
                                                                                                              
                                                                                                              
""", Fore.RESET)


def gameover():
    print(Fore.RED, """
              ▄████  ▄▄▄       ███▄ ▄███▓▓█████     ▒█████   ██▒   █▓▓█████  ██▀███  
             ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒
            ▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███      ▒██░  ██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒
            ░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄  
            ░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒   ░ ████▓▒░   ▒▀█░  ░▒████▒░██▓ ▒██▒
             ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░   ░ ▒░▒░▒░    ░ ▐░  ░░ ▒░ ░░ ▒▓ ░▒▓░
              ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     ░ ▒ ▒░    ░ ░░   ░ ░  ░  ░▒ ░ ▒░
            ░ ░   ░   ░   ▒   ░      ░      ░      ░ ░ ░ ▒       ░░     ░     ░░   ░ 
                  ░       ░  ░       ░      ░  ░       ░ ░        ░     ░  ░   ░     
                                                                 ░                   
            """, Fore.RESET)


def update_money(money: str, screen_name: str) -> str:
    """
    This function updates money in game database, which means it adds or takes money from database
    If in argument in money variable will be given "-200" it will minus that amount of money from database
    and update it, or if in money variable will be given "200" then it will add that amount of money to
    the money in database.
    """
    symbol = money[0]  # checks if string have minus sign at the beginning or not
    
    if symbol == "-":  # if yes then money will be minused
        money = int(money[1:])
        sql.kursori.execute(f"update game "
                            f"set money=((select money from game where screen_name='{screen_name}') - {money})"
                            f"where screen_name='{screen_name}';")
        return "UPDATED_MONEY_ADD"
    
    else:  # if not money will be added
        money = int(money)
        sql.kursori.execute(f"update game "
                            f"set money=((select money from game where screen_name='{screen_name}') + {money})"
                            f"where screen_name='{screen_name}';")
        
    if sql.kursori.rowcount == 1:
        return "UPDATED_MONEY_REMOVED"
    
    return "NOTHING_UPDATED"


def get_airport_name_and_country_by_icao(icao: str) -> str:
    "Returns airport's name using ICAO"
    sql.kursori.execute(f"select airport_name, country from airport where icao='{icao}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        return tulos[0]
    else:
        return 'NOTHING_FOUND'


def fly_to(icao, screen_name, no_fare=False):
    """
    Function changes Player's location and charges money if needed
    no_fare=False means that by default there always will be flight charge, but if in argument will be given True
    it only happens in one quest then the flight will be out of charge for that time :)
    """
    sql.kursori.execute(f"select airport_name, country from airport where icao='{icao}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        city = tulos[0][0]  # tulos = ((Barcelona),(Monaco),(Madrid),)
        country = tulos[0][1]
        cost = None         # price of flight
        calendar = None

        if no_fare:
            cost = f"FREE FLIGHT TO {city}"
            ###
        else:
            # Player's money minus 50$
            sql.kursori.execute(f"update game "
                                f"set money=((select money from game where screen_name='{screen_name}') - 50) "  # money = money - 50
                                f"where screen_name='{screen_name}';")
            if sql.kursori.rowcount == 1:
                cost = f"{city} 50$"
            else:
                return ["SCREEN_NAME_DOES_NOT_EXIST", "null", "null"]
        
        # Player calendar change
        cur_date = get_player_calendar(screen_name)
        cur_date = update_calendar(cur_date)

        sql.kursori.execute(f'''UPDATE game 
                            SET calendar="{cur_date}" 
                            WHERE screen_name="{screen_name}";''')
        if sql.kursori.rowcount == 1:
            calendar = "CALENDAR UPDATED"
        else:
            calendar = "ERROR_CALENDAR"
            return ['null', calendar, cost]

        # Player location change
        sql.kursori.execute(f"update game "
                            f"set location=(select icao from airport where airport_name='{city}')"
                            f"where screen_name='{screen_name}';")
        
        if sql.kursori.rowcount == 1:
            return ["SUCCESSFUL FLIGHT", calendar, cost]
        else:
            return ["FLIGHT FAILED AT LOCATION CHANGE"]
    else:
        return ["ERROR NO SUCH CITY EXISTS", "null", 'null']


def get_latitude_and_longtitude_by_icao(icao):
    """Fetch location(LAT, LONG) of airport thru SQL using ICAO."""
    # Tietokannan ja pycharm valillä yhdeyksen asentaminen ja kyselyn tehtäminen ja tuloksen saaminen
    sql.kursori.execute(f"select latitude_deg, longitude_deg from airport where icao ='{icao}';")
    tulos = sql.kursori.fetchall()

    # Tsekataan jos tulos on tyhjä tai ei
    if tulos:
        # Jos ei tyhjä tulostetaan taulu rivi riviltä ja palautetaan tulos eli taulu
        sijanti = tulos[0]
        return sijanti

    # Jos tulos on tyhjä tulostetaan virhe viesti ja palautetaan tyhjän listaan
    print("LENTOKONEASEMA_NOT_FOUND_404")
    return []


# Funktio
def measure_distance_between_lentokentta(icao_1, icao_2):
    sijanti_1 = get_latitude_and_longtitude_by_icao(icao_1)
    sijanti_2 = get_latitude_and_longtitude_by_icao(icao_2)

    return distance.distance(sijanti_1, sijanti_2).km


def print_9_nearest_airports(icao):
    sql.kursori.execute(f"select icao, latitude_deg, longitude_deg, airport_name, country from airport")
    tulos = sql.kursori.fetchall()

    nearest_9_airports = list()
    if tulos:
        airports = dict()
        for airport in tulos:
            distance = measure_distance_between_lentokentta(icao, airport[0])
            airports[airport[0]] = distance  # {icao: distance, icao: distance, ...}
        airports = sorted(airports.items(), key=lambda item: item[1])  # sort dictionary by its values

        for i in range(1, 10):
            nearest_9_airports.append(airports[i][0])  # adds already sorted icao codes to new list
        
        airport_list = []
        for icao in nearest_9_airports:
            name_and_country = get_airport_name_and_country_by_icao(icao)
            # YE' OLDE print(f"({icao}) {name_and_country[0]}, {name_and_country[1]}")
            
            # instead of printing, makes a list and writes there 9 airports:
            airport_list.append(icao + " " + name_and_country[0] + " " + name_and_country[1])
             
        return airport_list
    else:
        return 'NONE'


def get_epilogue():
    print('''
The first thing you do after arriving back in Monaco is finding the "ice cream truck driver" you owed the money to and 
hand over the money. They give off a devious smirk and let you pick an ice cream from the truck as a sign of good will.
Or so you thought.
You get home and notice that no one is home and there is a letter for you on the table. The letter reads:

- We've waited for your debt for long enough. By the time you read this it's likely that you've paid it off,
but that just doesn't cut it anymore. 
We've taken your love interest. They were very willing to follow once they learned about your debt.
Call it a late fee if you will. They'll prove their usefulness in time.
Wish to save them? Fork over the late fees. Good luck!

You rush back to the ice cream truck driver's house and peer through the windows.
You see your significant other making ice cream inside.
Just as you do, the truck driver notices you and tells you to get off his property unless you're about to pay them.
They let out a roaring laugh at your defeated look as you leave, determined to right this wrong.

Your troubles with money aren't quite over it seems.
To be continued?
''')


def add_player(screen_name, debt):
    sql.kursori.execute(f"insert into game(screen_name,location,money,debt, calendar) "
                        f"values('{screen_name}','MO',500,{debt}, '10/04/1997');")
    if sql.kursori.rowcount == 1:
        
        return 'NAME/DEBT UPDATED'
    else:
        return 'ERROR UPDATING NAME/DEBT'


def get_player_location(screen_name: str) -> str:
    sql.kursori.execute(f"select location from game where screen_name='{screen_name}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        return tulos[0][0]
    else:
        return "UNKNOWN_ERROR"


def get_player_money(screen_name:str) -> str:
    sql.kursori.execute(f"select money from game where screen_name='{screen_name}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        return tulos[0][0]
    else:
        return "PLAYER_NOT_FOUND_EXCEPTION"
        

def get_player_debt(screen_name:str) -> str:
    sql.kursori.execute(f"SELECT debt FROM game WHERE screen_name='{screen_name}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        return tulos[0][0]
    else:
        return "SQL_QUERY_FAIL"


def get_player_calendar(screen_name: str) -> str:
    sql.kursori.execute(f'SELECT calendar FROM game WHERE screen_name="{screen_name}";')
    tulos = sql.kursori.fetchone()
    if tulos:
        return tulos[0]
    else:
        return 'brokendate'


def can_play_blackjack(screen_name):
    location = get_player_location(screen_name)
    sql.kursori.execute(f"select blackjack from airport where icao='{location}';")
    tulos = sql.kursori.fetchall()
    if tulos:
        if tulos[0][0] == 0:
            return False
        else:
            return True
    else:
        return False
