# constants.py

import os
from config import *

static_prefix = "/static" # previously "path_serve"
api_prefix = "/api"

cors_origins = [
    "*",
    ]

host = f"http://{uvicorn_HOST}:{uvicorn_PORT}" # ammend for * protocols later
host_index = f"{host}/index.html"

path_app = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))

path_frontend = f"{path_app}/frontend"
path_index = f"{path_frontend}/index.html"

path_game = f"{path_frontend}/main.html"

path_backend = f"{path_app}/backend"
path_router = f"{path_backend}/router.py"

