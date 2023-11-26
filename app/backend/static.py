# static.py

from fastapi import APIRouter

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from core.constants import static_prefix, path_frontend

router = APIRouter()
router.mount("/", StaticFiles(directory=path_frontend), name="static")

@router.get("/")
async def index():
    return FileResponse(f"{path_index}", media_type="text/html")
    