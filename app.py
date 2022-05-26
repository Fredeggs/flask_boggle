from crypt import methods
from boggle import Boggle
from flask import Flask, redirect, render_template, request, jsonify

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc123"

boggle_game = Boggle()
board = boggle_game.make_board()


@app.route("/")
def show_board():
    return render_template("base.html", board=board)


@app.route("/process-guess", methods=["POST"])
def process_guess():
    guess = request.get_json().get("$guess", "nothing")
    msg = boggle_game.check_valid_word(board, guess)
    result = jsonify(result=msg)
    return result
