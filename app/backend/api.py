# api.py

from fastapi import APIRouter, Body
from fastapi import Request
from core.utils import log, sanitise_gamedata
from backend.score import city_points
import json
import re
from fastapi.responses import JSONResponse

from backend.database import update_game

router = APIRouter()

@router.get("/health")
def example():
    return {"status": "200"} #lol

@router.post("/end")
async def complete(request: Request):
    data = await request.json()

    s_game_mode, s_usern, s_totalscore = sanitise_gamedata(data["game_mode"], data["usern"], data["totalscore"])
    print(s_game_mode)
    print(s_usern)
    print(s_totalscore)
    #rtmp = update_game(s_game_mode, s_usern, s_totalscore) 

    response = {"tmp": "response"} # change for nhigh score n shit later
    return JSONResponse(content=response) 

'''
idk = {"usern": "name", "totalscore":"0"}

'''

@router.post("/submit") # rename to slash round later
async def rround(request: Request):
    data = await request.json()

    data = json.loads(data)

    if data["game_mode"] == "city":
        points = city_points(data)
        response = {"score": points}
        return JSONResponse(content=response)
        else:
            points = city_points(data)
            response = {"score": points}
            return JSONResponse(content=response)

    elif data["game_mode"] == "sleuth":
        print("HANDLE SLUETH")
    
    elif data["game_mode"] == "landmark":
        print("HANDLE LANDMARK")

        
 
    
    


