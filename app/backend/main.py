# main.py

from config import *
from core.constants import *

from fastapi import FastAPI, Request

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import FileResponse
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from backend.router import router

from backend.static import router as static

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

app.include_router(router)
app.mount(static_prefix, static)

templates = Jinja2Templates(directory=path_frontend)

@app.get("/")
async def index():
    return FileResponse(f"{path_index}", media_type="text/html")

# Game page
@app.get("/game")
async def game_page(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'standard'})
    #return FileResponse(f"{path_game}", media_type="text/html")

# StreetSleuth Game page
@app.get("/streetsleuth")
async def street_sleuth(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'streetsleuth'})
    #return FileResponse(f"{path_game}", media_type="text/html")

@app.exception_handler(404)
async def redirect(_, __):
    return RedirectResponse(f"{host}")

@app.exception_handler(404)
async def redirect(_, __):
    return RedirectResponse(f"{host}")
