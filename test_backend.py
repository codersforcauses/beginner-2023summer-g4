from app.core.utils import sanitise_gamedata

import pytest

def test_sanitise():
    control_game_mode = "city"
    control_usern = "testuser"
    control_totalscore = 0

    results = None

    # TEST THE GAME MODE VALIDITY
    valid_gamemodes = ["city", "discoveries", "sleuth", "landmark"]
    for game in valid_gamemodes:
        assert sanitise_gamedata(game, control_usern, control_totalscore) == results[0]
    