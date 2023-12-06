from flask import Flask, Response
import json

import flight_game_itself as f_game

server = Flask(__name__)


@server.route('/') # root directory. Returns path to the another document
def main_menu():
    response = {'connection':'established'}
    response = json.dumps(response)
    return Response(content_type='application/json', response=response, status = 200)

@server.route('/start/<username>/<debt>')
def start(username, debt):
    
    sql_game_init = f_game.load_database.load_events()
    sql_player = f_game.g_func.add_player(username, debt)

    response = {
        'user': sql_player,
        'game': sql_game_init
    }
    response = json.dumps(response)
    return Response(response= response, status=200, mimetype="application/json")



if __name__ == "__main__":
    server.run(use_reloader = True)