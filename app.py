from crypt import methods
from boggle import Boggle
from flask import Flask, redirect, render_template, request, jsonify, session

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc123"

boggle_game = Boggle()

@app.route("/")
def show_board():
    """Displays the Boggle UI and creates a session of the board"""
    session['board'] = boggle_game.make_board()
    return render_template("index.html")


@app.route("/process-guess", methods=["POST"])
def process_guess():
    """Processes an incoming "guess" from the user. Returns json data as to whether the guess is valid or not"""
    guess = request.get_json().get("$guess", "nothing")
    board = session["board"]
    msg = boggle_game.check_valid_word(board, guess)
    result = jsonify(result=msg)
    
    return result

@app.route("/show_game_over")
def show_game_over():
    """Displays the game over page and allows the user to play again"""
    return render_template("gameover.html")

@app.route("/process-game-over", methods=["POST"])
def process_game_over():
    """Processes the user's score and determines if it was a high score. Also increments the number of games played stored in the session"""
    response = request.get_json().get('score', 0)
    session["score"] = response
    try:
        if response > session["highscore"]:
            session["highscore"] = response
    except:
        session["highscore"] = response
    try:
        session["played"] += 1
    except KeyError:
        session["played"] = 1
    return jsonify(played=session['played'], highscore=session["highscore"])
