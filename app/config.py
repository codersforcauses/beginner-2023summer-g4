# config.py

import os

# Path Connector
path_app = os.path.dirname(os.path.realpath(__file__))
path_frontend = f"{path_app}/frontend" 
path_backend = f"{path_app}/backend"

# Uvicorn Configuration
uvicorn_HOST = "127.0.0.1"
uvicorn_PORT = 5000
uvicorn_LOGGING = "info"

# Frontend Serveing
path_host = f"http://{uvicorn_HOST}:{uvicorn_PORT}" # ammend for diff protocol later
path_serve = "/app"

# CORS Nonsense
cors_origins = [
    "*", # Development
    ]

# Debugging
DEBUG = True
if DEBUG:
    print(f"[+] DEBUG: True, Debugging (log) enabled.")

def log(message: str) -> None:
    if not DEBUG:
        pass
    else: print(f"{message}")
    return
