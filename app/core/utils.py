# utils.py

import sqlite3

from core.constants import *
from config import *

def log(message: str) -> None:
    if not DEBUG:
        pass
    else: print(f"{message}")
    return
# Handler Functions in Tandem with Uvicorn Logging

def rebuild(database: str) -> bool:
    
    if os.path.exists(database) and os.path.getsize(database) > 0:
        os.remove(database)

    con = sqlite3.connect(database)
    cur = con.cursor()

    query = '''
        CREATE TABLE IF NOT EXISTS pintpoint (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            points INTEGER
        );
        ''' # change points to float later, and make the whole schema lol

    cur.execute(query)

    con.commit()
    con.close()

    return True