from crypt import methods
from boggle import Boggle
from flask import Flask, redirect, render_template, request, jsonify, session

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc123"

boggle_game = Boggle()
board = boggle_game.make_board()

@app.route("/")
def show_board():
    return render_template("index.html", board=board)


@app.route("/process-guess", methods=["POST"])
def process_guess():
    guess = request.get_json().get("$guess", "nothing")
    msg = boggle_game.check_valid_word(board, guess)
    result = jsonify(result=msg)
    return result

@app.route("/show_game_over")
def show_game_over():
    return render_template("gameover.html")

@app.route("/process-game-over", methods=["POST"])
def process_game_over():
    response = request.get_json().get('score', 0)
    try:
        if response > session["highscore"]:
            session["highscore"] = response
    except:
        session["highscore"] = response
    try:
        session["played"] += 1
    except KeyError:
        print('poopy!')
        session["played"] = 1
    return jsonify(played=session['played'], highscore=session["highscore"])
