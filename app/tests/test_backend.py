import pytest

from core.utils import sanitise_gamedata
from backend.database import *


def test_sanitise():
    control_game_mode = "city"
    control_usern = "testuser"
    control_totalscore = 0

    # TEST THE GAME MODE VALIDITY
    valid_gamemodes = ["city", "discoveries", "sleuth", "landmark"]
    for game in valid_gamemodes:
        assert sanitise_gamedata(game, control_usern, control_totalscore)[0] == game

    invaid_gamemode = "THIS IS NOT A GAMEMODE"
    assert sanitise_gamedata(invaid_gamemode, control_usern, control_totalscore)[0] == "city"

    # TEST THE USERNAME VALIDITY
    valid_usernames = ["testuser", "test.user", "test_user", "test_user_123."]
    for username in valid_usernames:
        assert sanitise_gamedata(control_game_mode, username, control_totalscore)[1] == username

    invalid_username = "hello@test"
    assert sanitise_gamedata(control_game_mode, invalid_username, control_totalscore)[1] == "hellotest"

    # TEST TOTALSORE VALIDITY
    valid_totalscores = [0, 2000, 300, 3043]
    for score in valid_totalscores:
        assert sanitise_gamedata(control_game_mode, control_usern, score)[2] == score

    invalid_totalscore = "invalid" # string is an invalid total score
    assert sanitise_gamedata(control_game_mode, control_usern, invalid_totalscore)[2] == 0

def test_new_leaderboard_entry():

    valid_username = "TEST_USERNAME_DB"
    valid_gamemode = 'city'
    valid_totalscore = 500

    opt = update_game(valid_gamemode, valid_username, valid_totalscore)

    assert opt == {"score":"complete", "alert":"no new high score"}

    existing_username = "pinpoint_bot"
    new_highscore = 500
    assert update_game(valid_gamemode, existing_username, new_highscore) == {"score":"complete", "alert":"new high score"}

    existing_username = "pinpoint_bot"
    new_score = 400
    assert update_game(valid_gamemode, existing_username, new_score) == {"score":"complete", "alert":"no new high score"}   
    






    

