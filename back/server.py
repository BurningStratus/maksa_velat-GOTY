from flask import Flask, Response
from flask_cors import CORS
import json
import math

from functions import general_functions as g_func
from functions import quest_functions as q_func
from SQL_Scripts import load_database, sql_connection as sql
#### TODO check SQL pass
####

server = Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'


########### Quick-Access Memory Box #########
g_func.get_players_list(load_serverside=True)

#############################################

@server.route('/')
def main_menu():
    response = {'connection': 'established'}
    response = json.dumps(response)
    return Response(content_type='application/json', response=response, status=200)


@server.route('/retrieve_players')
def retrieve_players():
    player_list = g_func.get_players_list()
    response = json.dumps(player_list)
    return Response(response = response, status = 200, mimetype = "application/json")


@server.route('/start/<username>/<debt>')
def start(username, debt):

    if username in g_func.get_players_list(serverside = True):
        player_index = g_func.get_players_list(serverside = True).index(username)
        players_list = g_func.get_players_list(serverside = True)
        
        sql_game_init = 'LOADED'
        # moves needed username to the last index of local players list.
        
        # example: username = lob, index(lob) = 1
        # example players_list : [goog, lob, gos]
        buffer = None
        # 'gos'
        buffer = players_list[-1]
        # gos becomes lob
        # [goog, lob, lob]
        players_list[-1] = players_list[player_index]
        # lob(og) becomes lob
        # [goog, gos, lob]
        players_list[player_index] = buffer
        sql_player = players_list[-1]
    else:
        sql_game_init = load_database.load_events()
        # print(g_func.get_players_list(serverside = True))
        sql_player = g_func.add_player(username, debt)

    print('Username: ' + username)

    response = {
        'username': username,
        'user': sql_player,
        'game': sql_game_init
    }
    response = json.dumps(response)
    return Response(response = response, status = 200, mimetype = "application/json")


@server.route('/init_cities')
def init_cities():
    cities = g_func.get_coordinatesSQL()
    cities = json.dumps(cities)
    return Response(response= cities, status = 200, mimetype = "application/json")


@server.route('/infoDex_userinit/caller/')
def retrieve_player():
    ### fetch current player
    
    player_name = g_func.get_players_list(True)[-1]
    response = json.dumps({
        "player": player_name
    })
    return Response(response=response, status=200, mimetype="application/json")


@server.route('/infoDex_navigation/<username>')
def data_retriever(username: str) -> list:
    ### fetch all data about playa'
    
    undef_name = False
    if username == "undef_name":
        undef_name = True

    if username not in g_func.get_players_list(serverside = True) and not undef_name:
        response = {
        "date": "null",
        "money": "0",
        "debt": "0",
        "location": "location",
        "quest": "null",
        "airports": "null"}

        print("gave error, because :", undef_name, username)
        response = json.dumps(response)
        return Response(response=response, status=200, mimetype="application/json")
    
    elif username not in g_func.get_players_list(serverside = True) and undef_name:
        username = g_func.get_players_list(True)[-1]

        print('Had to use local names list. username:>', username)
    else:
        pass

    location = g_func.get_player_location(username)
    airports = g_func.print_9_nearest_airports(location)
    money = g_func.get_player_money(username)
    debt = g_func.get_player_debt(username)
    date = g_func.get_player_calendar(username)
    quest = q_func.do_quest(username)
    blackjack = g_func.can_play_blackjack(username)
    game_state = g_func.gameover(username)


    response = {
    "date": date,
    "money": money,
    "debt": debt,
    "location": location,
    "quest": quest,
    "blackjack": blackjack,
    "game_state": game_state,
    "airports": airports}

    response = json.dumps(response)
    return Response(response=response, status=200, mimetype="application/json")


@server.route("/quest/<username>.<quest_data>")
def quest_completion(username: str, quest_data: str):
    response = json.dumps(q_func.quest_decryptor(quest_data, username))
    return Response(response= response, status = 200, mimetype = "application/json")


@server.route('/navigation.<destination>.<username>')
def flyto(destination, username):

    response = g_func.fly_to(destination, username)
    

    # game 
    response = json.dumps({
    'STATS': response,
    })
    return Response(response=response, status=200, mimetype="application/json")


@server.route('/blackjack_fetch/')
def blackjack_fetch():
    player_name = g_func.get_players_list(serverside=True)[-1]
    location = g_func.get_player_location(player_name)
    money = g_func.get_player_money(player_name)

    response = {
        "username": player_name,
        "location": location,
        "money": money}
    
    response = json.dumps(response)
    return Response(status= 200, response= response, mimetype ="application/json")

@server.route('/blackjack_update/<username>/<sum>')
def blackjack_update(username, sum):
    
    if type(sum) != str:
        try:
            sum = str(sum)
        except TypeError:
            return Response(status = 300, response= json.dumps({"UPDATE":"BAD_TYPE", "REASON": sum, "TYPE": type(sum)}), mimetype= "application/json")
    
    updated_money = g_func.update_money(sum, username)
    new_money = g_func.get_player_money(username)
    response = {
        "update": updated_money,
        "updated_money": new_money
    }
    response = json.dumps(response)

    return Response(status= 200, response= response, mimetype= "application/json")

if __name__ == "__main__":
    server.run(use_reloader=True, debug=True)
