# api.py

from fastapi import APIRouter, Body
from fastapi import Request
from core.utils import log


router = APIRouter()

@router.get("/example")
def example():
    return {"json": "example"}

@router.post("/submit")
async def data(request: Request):
    data = await request.json()
    print(data)
    


