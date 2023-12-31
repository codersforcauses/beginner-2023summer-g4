# api.py

from fastapi import APIRouter, Body
from fastapi import Request
from core.utils import log
from backend.score import city_points
import json
from fastapi.responses import JSONResponse

from backend.statistics import city_statistics, city_game_data

router = APIRouter()

@router.get("/health")
def example():
    return {"status": "200"}

@router.post("/submit")
async def data(request: Request):
    data = await request.json()

    data = json.loads(data)
    print("test test 123")

    if data["game_mode"] == "city":
        
        if data["distance"] == "complete":
            city_statistics(city_game_data, data["totalscore"])
            response = {"score": "complete"}
            return JSONResponse(content=response) # this currently breaks the game client, fix later

        else:
            city_game_data.update({data["round"]: data})

            points = city_points(data)
            response = {"score": points}
            return JSONResponse(content=response)
    elif data["game_mode"] == "sleuth":
        print()
    elif data["game_mode"] == "landmark":
        print()
        
 
    
    


