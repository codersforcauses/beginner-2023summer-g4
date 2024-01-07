# constants.py

import os
from config import *

static_prefix = "/static" # previously "path_serve"
api_prefix = "/api"

cors_origins = [
    "*",
    ]

pp_banner = f"""
 ____   ___  ____  ______  __ __      ____  ____  
|    \ /  _]|    \|      ||  |  |    |    \|    \ 
|  o  )  [_ |  D  )      ||  |  |    |  o  )  o  )
|   _/    _]|    /|_|  |_||  _  |    |   _/|   _/ 
|  | |   [_ |    \  |  |  |  |  |    |  |  |  |   
|  | |     ||  .  \ |  |  |  |  |    |  |  |  |   
|__| |_____||__|\_| |__|  |__|__|    |__|  |__|   
Perth PinPoint! 
2023/4 CodersForCauses Beginner Project by "Nef Fan Club" @ <https://github.com/codersforcauses/beginner-2023summer-g4>

#####################################

http://{uvicorn_HOST}:{uvicorn_PORT}

#####################################

DISCLAIMER:
This project is not associated with "GeoGuessr" - Please refer to the LICENSE (located in the repository above) for licensing information.
"""

'''
no this data is not normalised, no we dont care - we use nested subqueries beacuse inner joins make us sad
go away nerds
'''
db_build_queries = [
'''CREATE TABLE IF NOT EXISTS users (
                    user_id INTEGER PRIMARY KEY NOT NULL ON CONFLICT IGNORE,
                    username TEXT NOT NULL
)''',
'''CREATE TABLE IF NOT EXISTS games (
                    user_id INTEGER,
                    game_mode TEXT NOT NULL,
                    maxpoints INTEGER,
                    totalpoints INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
)''',
'''
INSERT INTO users (user_id, username) VALUES (0, 'pinpoint_bot')
''',
'''
INSERT INTO games (game_mode, user_id, maxpoints, totalpoints) VALUES ('city', 0, 0, 0)
''',
'''
INSERT INTO games (game_mode, user_id, maxpoints, totalpoints) VALUES ('discoveries', 0, 0, 69)
''',
'''
INSERT INTO games (game_mode, user_id, maxpoints, totalpoints) VALUES ('slueth', 0, 0, 0)
''',
'''
INSERT INTO games (game_mode, user_id, maxpoints, totalpoints) VALUES ('landmark', 0, 0, 0)
''',
] 
'''
example query:
SELECT totalpoints FROM games WHERE user_id = (SELECT user_id FROM users WHERE username = 'pinpoint_bot') AND game_mode = 'discoveries'
should return value 69
'''

host = f"http://{uvicorn_HOST}:{uvicorn_PORT}" # ammend for * protocols later
host_index = f"{host}/index.html"

path_app = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))

path_frontend = f"{path_app}/frontend"
path_index = f"{path_frontend}/index.html"

path_game = f"{path_frontend}/main.html"

path_backend = f"{path_app}/backend"
path_router = f"{path_backend}/router.py"

path_core = f"{path_app}/core"
path_db = f"{path_core}/pinpoint.db"