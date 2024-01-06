# constants.py

import os
from config import *

static_prefix = "/static" # previously "path_serve"
api_prefix = "/api"

cors_origins = [
    "*",
    ]

'''
no this data is not normalised, yes we could normalise it, no we dont care
this is shrimplest and all thats required to function
go away nerds
'''
db_build_queries = [
    '''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT  NULL ON CONFLICT IGNORE,
        usern TEXT NOT NULL
    )
    ''',
    '''
    CREATE TABLE IF NOT EXISTS city (
        uid INTEGER,
        bestscore INTEGER,
        totalscore INTEGER,
        FOREIGN KEY (uid) REFERENCES users(id)
    )
    ''',
    '''
    CREATE TABLE IF NOT EXISTS discoveries (
        uid INTEGER,
        bestscore INTEGER,
        totalscore INTEGER,
        FOREIGN KEY (uid) REFERENCES users(id)
    )
    ''',
    '''
    CREATE TABLE IF NOT EXISTS sleuth (
        uid INTEGER,
        bestscore INTEGER,
        totalscore INTEGER,
        FOREIGN KEY (uid) REFERENCES users(id)
    )
    ''',
    '''
        CREATE TABLE IF NOT EXISTS landmark (
        uid INTEGER,
        bestscore INTEGER,
        totalscore INTEGER,
        FOREIGN KEY (uid) REFERENCES users(id)
    )
    ''',
    '''INSERT INTO users (usern)
    VALUES ('admin')''',
    '''INSERT INTO city (uid, bestscore, totalscore)
    VALUES (1, 0, 0)''',
    '''INSERT INTO discoveries (uid, bestscore, totalscore)
    VALUES (1, 0, 0)''',
    '''INSERT INTO landmark (uid, bestscore, totalscore)
    VALUES (1, 0, 0)''',
    '''INSERT INTO sleuth (uid, bestscore, totalscore)
    VALUES (1, 0, 0)'''
] # admin user

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