import back.quests.list_of_quests as p_quests
from back.SQL_Scripts import sql_connection as sql
from back.functions import general_functions as g_func
from back.quests import maksa_velat_projektia as v_quests


# Function updates quest/event_id in asked city
def update_quest(quest_id, city):
    sql.kursori.execute(f"update airport set event_id = {quest_id} where airport_name = '{city}';")
    if sql.kursori.rowcount == 1:
        return "UPDATED"
    return "NOTHING_UPDATED"


# Function for getting quest/event's id corresponding to the city
def get_quest_id_by_icao(icao):
    sql.kursori.execute(f"select event_id from airport where icao='{icao}'")
    tulos = sql.kursori.fetchall()
    if tulos:
        return tulos[0][0]
    return 0


# Function for doing quests corresponding locations event_id's
def do_quest(screen_name):
    icao = g_func.get_player_location(screen_name)
    quest_id = get_quest_id_by_icao(icao)
    if quest_id == 1:
        p_quests.starter_quest_caller(screen_name)  # Calls Monaco Quest
        update_quest(0, "Monaco")  # This marks quest as done in database
    elif quest_id == 2:
        p_quests.chess_in_germany_caller()  # Calls German Quest
        update_quest(0, "Berlin")  # This marks quest as done in database
    elif quest_id == 3:
        p_quests.polish_incident_caller(screen_name)  # Calls Polish Quest
        update_quest(0, "Warsaw")  # This marks quest as done in database
    elif quest_id == 4:
        v_quests.vatican_escape_caller(screen_name)  # Calls Vatican Quest
        update_quest(0, "Vatican City")  # This marks quest as done in database
    elif quest_id == 5:
        v_quests.dublin_adventure_caller(screen_name)  # Calls Lepricon Quest
        update_quest(0, "Dublin")  # This marks quest as done in database
    elif quest_id == 6:
        v_quests.madrid_wine_smuggler_caller(screen_name)  # Calls Madrid Quest
        update_quest(0, "Madrid")  # This marks quest as done in database
    elif quest_id == 7:
        v_quests.oslo_quest(screen_name)  # Calls Oslo Quest
        update_quest(0, "Oslo")  # This marks quest as done in database
    elif quest_id == 8:
        p_quests.romania(screen_name)  # Calls Romania Quest
        update_quest(0, "Bucharest")  # This marks quest as done in database
    elif quest_id == 11:
        p_quests.black_cat_caller(screen_name)  # Calls Black Cat Random Event
        update_quest(0, g_func.get_player_location(screen_name))  # This marks quest as done in database
    elif quest_id == 13:
        p_quests.bandits(screen_name)  # Calls Bandit event Random Event
        update_quest(0, g_func.get_player_location(screen_name))  # This marks quest as done in database
    else:
        print("Nothing seems out of the ordinary")
