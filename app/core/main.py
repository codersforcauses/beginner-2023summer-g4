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

@app.get("/leaderboard")
async def leaderboard_page(request: Request):
    return FileResponse(f"{path_frontend}/results.html", media_type="text/html")

@app.get("/city")
async def game_page(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'city'})

@app.get("/discoveries")
async def game_page(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'discoveries'})

@app.get("/sleuth")
async def street_sleuth(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'sleuth'})

@app.get("/landmark")
async def street_sleuth(request: Request):
    return templates.TemplateResponse('main.html', {"request": request, 'game_mode': 'landmark'})


@app.exception_handler(404)
async def redirect(_, __):
    return RedirectResponse(f"{host}")

@app.exception_handler(404)
async def redirect(_, __):
    return RedirectResponse(f"{host}")
