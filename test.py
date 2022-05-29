from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    @classmethod
    def setUpClass(cls):
        boggle_game = Boggle()
        print('hello')

    def test_index(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<form id="guess-word">', html)
            self.assertTrue(session['board'])

    def test_process_guess(self):
        boggle_game = Boggle()
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = boggle_game.make_board()
                resp = client.post('/process-guess', data={"$guess": "something"})

                self.assertEqual(resp.status_code, 200)

    def test_show_gameover(self):
        with app.test_client() as client:

            resp = client.get('/show_game_over')
            html = resp.get_data(as_text=True)

            self.assertIn('<h1>Game Over</h1>', html)

    def test_process_game_over(self):
        with app.test_client() as client:
            resp = client.post('/process-game-over', data={"score": 24})
            playNum = resp.get_data("played")
            # with client.session_transaction() as change_session:
            #     change_session['board'] = boggle_game.make_board()

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(playNum, 1)

    

