from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'yo yo yo'

if __name__ == '__main__':
    app.run()
