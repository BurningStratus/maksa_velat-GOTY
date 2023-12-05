from flask import Flask, Response
import json

server = Flask(__name__)


@server.route('/') # root directory. Returns path to the another document
def main_menu():
    response = {'path':'main-menu.html'}
    response = json.dumps(response)
    return Response(content_type='application/json', response=response, status = 200)

@server.route('')
def start


if __name__ == "__main__":
    server.run(use_reloader = True)