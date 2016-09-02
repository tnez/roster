from flask import Flask, jsonify, render_template
from data import players
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/players')
def get_players():
    """Return list of all players as JSON"""
    return jsonify(players)


if __name__ == '__main__':
    app.run()
