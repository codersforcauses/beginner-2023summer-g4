# utils.py

import re
import json
import sqlite3
import requests

from core.constants import *
from config import *

def log(message: str) -> None:
    if DEV:
        if not DEV_DEBUG:
            pass
        else: print(f"{message}")
        return
# Handler Functions in Tandem with Uvicorn Logging

def isalive(endpoint):
    r = requests.get(f"{host}{endpoint}", verify=False)
    if r.status_code == 200:
        log(f"[+] API Alive (200)")
    else:
        log(f"[+] API Down ({r.status_code})")

def validate_json(jdata): # unloaded
    data = jdata
    try:
        for key, value in data.items():
            if isinstance(value, list) or isinstance(value, dict):
                return False
        return True    
    except Exception as e:
        log(f"[-] JSON Decoding Error (validator): {e}")

def sanitise_gamedata(game_mode, usern, totalscore): # regex was easy to google

    #game_mode
    valid_gamemodes = ["city", "discoveries", "sleuth", "landmark"]
    if game_mode not in valid_gamemodes:
        log(f"[-] Gamedata Sanitisation: Invalid game_mode (defaulting to \"city\")")
        game_mode = "city"
    else:
        game_mode = game_mode

    username_regex = r'^[a-zA-Z0-9._ ]+$'
    if re.match(username_regex, usern):
        usern = usern
    else:
        usern = re.sub(r'[^a-zA-Z0-9._ ]', '', usern)

    try:
        totalscore = int(totalscore)
    except Exception as e:
        log(f"[-] Gamedata Sanitisation: Invalid totalscore (defaulting to 0)")
        totalscore = 0
        
    return game_mode, usern, totalscore

def rebuild(database: str) -> bool:
    if os.path.exists(database) and os.path.getsize(database) > 0:
        os.remove(database)

    con = sqlite3.connect(database)
    cur = con.cursor()

    for query in db_build_queries:
        cur.execute(query)

    con.commit()
    con.close()

    log(f"[+] Database Rebuilt")

    return True