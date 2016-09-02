from flask import Flask, jsonify, send_from_directory
from data import players
app = Flask(__name__)

@app.route('/')
def index():
    """Serve up the html boilerplate"""
    # using send_from_directory, to avoid conflicts between jinja and
    # angular templating
    return send_from_directory('templates', 'index.html')

@app.route('/players')
def get_players():
    """Return list of all players as JSON"""
    return jsonify(players)


if __name__ == '__main__':
    app.run()
