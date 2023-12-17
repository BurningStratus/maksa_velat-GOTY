from flask import Flask, Response
from flask_cors import CORS
import json

from functions import general_functions  as g_func
from SQL_Scripts import load_database, sql_connection


server = Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'

########### Quick-Access Memory Box #########
check_players = g_func.get_players_list(load_serverside=True)
print(check_players)
#############################################



@server.route('/')
def root():
    response = {'connection':'established',
                'status':'100'}
    response = json.dumps(response)
    return Response(content_type='application/json', response=response, status=100)


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
        
        # load events from the savegame
        sql_game_init = g_func.add_quests_to_map(username)
        
        print(sql_game_init)
        quests = 'LOCAL'
    else:
        sql_game_init = load_database.load_events()
        # print(g_func.get_players_list(serverside = True))
        sql_player = g_func.add_player(username, debt)
        quests = g_func.add_quests_toDB(username)

    print('Username received: ' + username)
    
    print(quests)

    response = {
        'user': sql_player,
        'game': sql_game_init,
        'quests': quests
    }
    response = json.dumps(response)
    return Response(response= response, status=200, mimetype="application/json")


@server.route('/infoDex_navigation/<username>')
def data_retriever(username):
    ### fetch all data about playa'
    location = g_func.get_player_location(username)
    airports = g_func.print_9_nearest_airports(location)
    money = g_func.get_player_money(username)
    debt = g_func.get_player_debt(username)

    response = {
        "money": money,
        "debt": debt,
        "location": location,
        "airports": airports
    }
    response = json.dumps(response)
    return Response(response=response, status=200, mimetype="application/json")


@server.route("/quest/<username>.<quest_data>")
def quest_completion(username: str, quest_data: str):
    decrypt = q_func.quest_decryptor(quest_data, username)
    writer = g_func.add_quests_toDB(username)
    print(writer)
    response = json.dumps(
        decrypt
    )
    return Response(response = response, status = 200, mimetype = "application/json")


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


@server.errorhandler(500)
def internal_error():
    response = json.dumps({
        "type": "INTERNAL ERROR",
        "description": "App encountered an inappropriate data"
    })
    return Response(response= response, status= 500, mimetype="application/json")


@server.errorhandler(404)
def server_error():
    response = json.dumps({
        "type": "REQUEST ERROR",
        "description": "The requested page does not exist"
    })
    return Response(response= response, status= 500, mimetype="application/json")


if __name__ == "__main__":
    server.run(threaded = True, use_reloader=True)
    
