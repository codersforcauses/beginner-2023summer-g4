# api.py

from fastapi import APIRouter, Body
from fastapi import Request
from core.utils import log, sanitise_gamedata, validate_json
from backend.score import city_points
import json
import re
from fastapi.responses import JSONResponse

from backend.database import update_game

router = APIRouter()

@router.get("/health")
def example():
    return {"status": "200"} #lol

@router.get("/leaderboard/discoveries")
async def discoveries_leaderboard():
    return

@router.get("/leaderboard/city")
async def city_leaderboard():
    return

@router.post("/end")
async def complete(request: Request):
    data = await request.json()

    if not validate_json(data):
        log(f"[-] JSON Validation Failed!")
    
    s_game_mode, s_usern, s_totalscore = sanitise_gamedata(data["game_mode"], data["usern"], data["totalscore"])
    result = update_game(s_game_mode, s_usern, s_totalscore) 

    response = result
    return JSONResponse(content=response) 

@router.post("/submit") # rename to slash round later
async def rround(request: Request):
    data = await request.json()

    if not validate_json(data):
        log(f"[-] JSON Validation Failed!")

    data = json.loads(data)

    if data["game_mode"] == "city":
        points = city_points(data)
        response = {"score": points}
        return JSONResponse(content=response)

    elif data["game_mode"] == "sleuth":
        print("HANDLE SLUETH")
    
    elif data["game_mode"] == "landmark":
        print("HANDLE LANDMARK")

        
 
    
    


