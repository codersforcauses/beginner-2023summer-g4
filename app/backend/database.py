# database.py

from core.utils import rebuild, log
from core.constants import path_db

import os, sys
import sqlite3

# Fallback function
if os.path.exists(path_db) and os.path.getsize(path_db) > 0:
    pass
else:
    log(f"[-] Database Not Built! (or empty)") ; log(f"[-] Rebuilding Database! (Fallback)")
    rebuild(path_db)
    log(f"[+] Database Rebuilt! (Fallback)")

#con = sqlite3.connect(path_db) ; cursor = con.cursor() ; con.close()
'''
note:
please run db_connect() and db_disconnect() before/after EVERY transaction
'''

def db_connect():
    con = sqlite3.connect(path_db)
    cursor = con.cursor()
    return con, cursor

def db_disconnect(con):
    con.commit()
    con.close()

query_leaderboard_top = '''
SELECT g.maxpoints, u.username FROM games g JOIN users u ON g.user_id = u.user_id WHERE g.game_mode = (?) ORDER BY g.maxpoints DESC LIMIT 10
'''
# (gamemode,)

query_leaderboard_all = '''
SELECT g.maxpoints, u.username FROM games g JOIN users u ON g.user_id = u.user_id WHERE g.game_mode = (?) ORDER BY g.maxpoints
'''
# (gamemode,)

#query_leaderboard_total = '''
#SELECT g.totalpoints, u.username FROM games g JOIN users u ON g.user_id = u.user_id WHERE g.game_mode = (?) ORDER BY g.maxpoints DESC LIMIT 10
#'''
# (game_mode, maxpoints/totalpoints)

def get_leaderboard(game_mode, filter_type): # limited to city and discoveries
    con, cursor = db_connect()

    if filter_type != 'all':
        cursor.execute(query_leaderboard_top, (game_mode,))
    else:
        cursor.execute(query_leaderboard_all, (game_mode,))
    results = cursor.fetchall()
    db_disconnect(con)
    return results

user_query_exists = '''
SELECT * FROM users WHERE username=(?)
'''
# (username,)
user_query_new = '''
INSERT INTO users (username) VALUES (?)
'''
# (username,)
game_query_exist = '''
SELECT * FROM games WHERE user_id IN (SELECT user_id FROM users WHERE username=(?)) AND game_mode=(?)
'''
# (username, game_mode)
game_query_new = '''
INSERT INTO games (user_id, game_mode, maxpoints, totalpoints) SELECT user_id, (?), (?), (?) FROM users WHERE username=(?)
'''
# (game_mode, maxpoints, totalpoints, username)

game_query_query = '''
SELECT maxpoints, totalpoints FROM games WHERE user_id = (SELECT user_id FROM users WHERE username = (?))
'''
# (username,)
game_query_update = '''
UPDATE games SET maxpoints = (?), totalpoints = (?) WHERE user_id = (SELECT user_id FROM users WHERE username = (?)) AND game_mode = (?)
'''
# (maxpoints, totalpoints, username, gamemode)

def update_game(game_mode, username, totalscore):
    con, cursor = db_connect()

    newmax = False

    cursor.execute(user_query_exists, (username,))
    user_exist = cursor.fetchone()
    if user_exist is not None:
        pass
    else:
        cursor.execute(user_query_new, (username,))
    
    cursor.execute(game_query_exist, (username, game_mode))
    exist = cursor.fetchone()

    if exist is not None:        
        cursor.execute(game_query_query, (username,))
        data = cursor.fetchone()
        stored_maxpoints, stored_totalscore = data

        new_totalscore = stored_totalscore + totalscore

        if stored_maxpoints < totalscore:
            new_maxpoints = totalscore
            newmax = True
        else:
            new_maxpoints = stored_maxpoints

        cursor.execute(game_query_update, (new_maxpoints, new_totalscore, username, game_mode)) 

    else:
        cursor.execute(game_query_new, (game_mode, totalscore, totalscore, username))

    db_disconnect(con)

    if newmax:
        return {"score":"complete", "alert":"new high score"}
    else:
        return {"score":"complete", "alert":"no new high score"}
