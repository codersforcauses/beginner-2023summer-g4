# api.py

from fastapi import APIRouter
from core.utils import log

router = APIRouter()

@router.get("/example")
def example():
    return {"json": "example"}



# blah blah blah gib points

@router.post("/api/submit")
async def submit_data(lat: float, lng: float):
    # {lat: -31.965491488012, lng: 115.88040029357118} // example data
    combine = lat + lng
    return {"combine": combine}

