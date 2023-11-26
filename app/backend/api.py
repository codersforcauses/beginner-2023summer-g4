# api.py

from fastapi import APIRouter
from core.utils import log

router = APIRouter()

@router.get("/example")
def example():
    return {"json": "example"}