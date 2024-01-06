# database.py

from core.constants import path_db

import os, sys
import sqlite3

if os.path.exists(path_db) and os.path.getsize(path_db) > 0:
    pass
else:
    log(f"[-] Database Not Built! (or empty)") ; log(f"[-] Please Rebuild with DATABASE = True in config!")
    sys.exit(-1)

#con = sqlite3.connect(path_db) ; cursor = con.cursor()
#con.close()

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

def update_game(game, usern, totalscore):
    # make sure sanitised
    # check if game played by user before
    # create if new
    # add points otherwise
    # check for new high score
    return


#def example():
#    con, cursor = connect()
#    cursor.execute("INSERT INTO users (id, usern, passwd) VALUES (?, ?, ?)", (1, "test", "test"))
#    close(con)
#    print("")

