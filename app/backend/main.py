# main.py

from config import cors_origins
from config import path_host, path_app, path_serve, path_frontend, path_backend

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
endpoint = "/api/v1"

'''

alternative single file version of fastapi.staticfiles class

# "serve frontend" in the backend @_@
# https://fastapi.tiangolo.com/advanced/sub-applications/
serve = FastAPI()
@serve.get("/")
def index():
    return FileResponse(f"{path_frontend}/index.html")
app.mount(/serve, serve)
'''

# Serve Static (frontend)
app.mount(path_serve, StaticFiles(directory=path_frontend), name="static")

# Disable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins, # ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Assume Frontend Intended
@app.get("/")
async def redirect():
    return RedirectResponse(f"{path_host}{path_serve}/index.html")

# Example API Data (modularise later)
@app.get(f"{endpoint}/backend")
async def backend():
    return {"backend": "data"}