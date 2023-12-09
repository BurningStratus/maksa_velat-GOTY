import quests.list_of_quests as p_quests
from SQL_Scripts import sql_connection as sql
from functions import general_functions as g_func
from quests import maksa_velat_projektia as v_quests


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


def quest_decryptor(quest_data: str) -> list:
    # RAND{CH}[0] or {PL}[]
    if quest_data[:3] == "RAND":
        pass

    head = quest_data[:1]



# Function for doing quests corresponding locations event_id's
def do_quest(screen_name):
    icao = g_func.get_player_location(screen_name)
    quest_id = get_quest_id_by_icao(icao)
    if quest_id == 1:
        return "MONA_quest"
        
        # p_quests.starter_quest_caller(screen_name)  # Calls Monaco Quest
        # update_quest(0, "Monaco")  # This marks quest as done in database
    elif quest_id == 2:
        return "CHES_randm"
        
        # p_quests.chess_in_germany_caller()  # Calls German Quest
        # update_quest(0, "Berlin")  # This marks quest as done in database
    elif quest_id == 3:
        return "POLN_quest"
        
        # p_quests.polish_incident_caller(screen_name)  # Calls Polish Quest
        # update_quest(0, "Warsaw")  # This marks quest as done in database
    elif quest_id == 4:
        return "VATC_quest"
        
        # v_quests.vatican_escape_caller(screen_name)  # Calls Vatican Quest
        # update_quest(0, "Vatican City")  # This marks quest as done in database
    elif quest_id == 5:
        return "DUBL_quest"
       
        # v_quests.dublin_adventure_caller(screen_name)  # Calls Lepricon Quest
        # update_quest(0, "Dublin")  # This marks quest as done in database
    elif quest_id == 6:
        return "MADR_quest"
        
        # v_quests.madrid_wine_smuggler_caller(screen_name)  # Calls Madrid Quest
        # update_quest(0, "Madrid")  # This marks quest as done in database
    elif quest_id == 7:
        return "OSLO_quest"
        
        # v_quests.oslo_quest(screen_name)  # Calls Oslo Quest
        # update_quest(0, "Oslo")  # This marks quest as done in database
    elif quest_id == 8:
        return "ROMN_quest"
        
        # p_quests.romania(screen_name)  # Calls Romania Quest
        # update_quest(0, "Bucharest")  # This marks quest as done in database
    elif quest_id == 11:
        return "BLCT_randm"
        
        # p_quests.black_cat_caller(screen_name)  # Calls Black Cat Random Event
        # update_quest(0, g_func.get_player_location(screen_name))  # This marks quest as done in database
    elif quest_id == 12:
        return "BLEN_randm"
    
    elif quest_id == 13:
        return "BAND_randm"
       
        # p_quests.bandits(screen_name)  # Calls Bandit event Random Event
        # update_quest(0, g_func.get_player_location(screen_name))  # This marks quest as done in database
    
    elif quest_id == 14:
        return "FUND_randm"
    

    elif quest_id == 15:
        return "WEED_randm"

    else:
        return "NONE_quest"
        # print("Nothing seems out of the ordinary")
