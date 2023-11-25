# init.py

import uvicorn
from config import *

if __name__ == "__main__":
    log(f"[+] Frontend Serving @ {path_host}{path_serve}/index.html") # HTML rewrite later
    
    uvicorn.run(
        "backend.main:app",
        host=uvicorn_HOST,
        port=uvicorn_PORT,
        log_level=uvicorn_LOGGING
        )

'''
Note:
The reload and workers parameters are mutually exclusive.
'''
