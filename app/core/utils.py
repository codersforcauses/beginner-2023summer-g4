# utils.py

from config import *

def log(message: str) -> None:
    if not DEBUG:
        pass
    else: print(f"{message}")
    return
# Handler Functions in Tandem with Uvicorn Logging