from flask import Flask, Response
from flask_cors import CORS
import json

from functions import general_functions  as g_func
from SQL_Scripts import load_database, sql_connection


server = Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'

@server.route('/')
def main_menu():
    response = {'connection':'established'}
    response = json.dumps(response)
    return Response(content_type='application/json', response=response, status = 200)

@server.route('/start/<username>/<debt>')
def start(username, debt):
    
    sql_game_init = load_database.load_events()
    sql_player = g_func.add_player(username, debt)
    
    response = {
        'user': sql_player,
        'game': sql_game_init
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

    return Response(response= response, status=200, mimetype="application/json")

@server.route('/navigation.<destination>.<username>')
def flyto(destination, username):
    response = g_func.fly_to(destination, username)
    response = json.dumps({
        'nofare': response
    })
    return Response(response= response, status=200, mimetype="application/json")

if __name__ == "__main__":
    server.run(use_reloader = True)