# api.py

from fastapi import APIRouter, Body
from fastapi import Request
from fastapi.responses import JSONResponse

from core.utils import log, validate_json, sanitise_gamedata

from backend.score import city_points
from backend.database import update_game, get_leaderboard

import json, re

router = APIRouter()

@router.get("/health")
def example():
    return {"status": "200"} #lol

@router.get("/leaderboard/discoveries/max")
async def discoveries_leaderboard():  
    leaderboard = get_leaderboard('discoveries', 'max')
    response = {i + 1: list(val) for i, val in enumerate(leaderboard)}
    return JSONResponse(content=response) 

@router.get("/leaderboard/discoveries/total")
async def discoveries_leaderboard():  
    leaderboard = get_leaderboard('discoveries', 'total')
    response = {i + 1: list(val) for i, val in enumerate(leaderboard)}
    return JSONResponse(content=response) 

@router.get("/leaderboard/city/max")
async def discoveries_leaderboard():  
    leaderboard = get_leaderboard('city', 'max')
    response = {i + 1: list(val) for i, val in enumerate(leaderboard)}
    return JSONResponse(content=response) 

@router.get("/leaderboard/city/total")
async def discoveries_leaderboard():  
    leaderboard = get_leaderboard('city', 'total')
    response = {i + 1: list(val) for i, val in enumerate(leaderboard)}
    return JSONResponse(content=response) 
'''
NOTICE:
DO NOT REFACTOR/MERGE THESE APIS; IF WE DYNAMICALLY SELECT LEADERBORADS VIA DYNAMIC USER INPUT - THIS MEANS WE NEED TO VALIDATE/SANITISE SUCH INPUT, THIS IS NOT DONE VIA THESE FUNCTIONS THAT INTERACT WITH THE DB
'''

@router.post("/end")
async def complete(request: Request):
    data = await request.json()
    data = json.loads(data)
    
    if not validate_json(data):
        log(f"[-] JSON Validation Failed!")
    
    game_mode = data["game_mode"]
    usern = data["usern"]
    totalscore = data["totalscore"]

    s_game_mode, s_usern, s_totalscore = sanitise_gamedata(game_mode, usern, totalscore)
    result = update_game(s_game_mode, s_usern, s_totalscore) 

    response = result
    return JSONResponse(content=response) 

@router.post("/submit") # rename to slash round later
async def rround(request: Request):
    data = await request.json()
    data = json.loads(data)

    if not validate_json(data):
        log(f"[-] JSON Validation Failed!")

    if data["game_mode"] == "city":
        points = city_points(data)
        response = {"score": points}
        return JSONResponse(content=response)

    elif data["game_mode"] == "sleuth":
        return ; log(f"[-] Submitted to game_mode sleuth")
    
    elif data["game_mode"] == "landmark":
        return ; log(f"[-] Submitted to game_mode landmark")

        
 
    
    


