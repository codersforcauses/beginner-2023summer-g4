# database.py

from core.constants import path_db

import os, sys
import sqlite3

if os.path.exists(path_db) and os.path.getsize(path_db) > 0:
    continue
else:
    log(f"[-] Database Not Built! (or empty)") ; log(f"[-] Please Rebuild with DATABASE = True in config!")
    sys.exit(-1)

con = sqlite3.connect(path_db)
con.close()