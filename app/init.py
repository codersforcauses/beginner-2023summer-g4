# init.py

import uvicorn
from config import *
from core.utils import *
from core.constants import *

if __name__ == "__main__":

    if DEBUG:
        print(f"[+] DEBUG: True, Debugging (log) enabled.")

    log(f"[+] Initialising Application")

    if DATABASE:
        log(f"[+] Rebuilding Database")
        rebuild(path_db)
    
    uvicorn.run(
        "core.main:app",
        host=uvicorn_HOST,
        port=uvicorn_PORT,
        log_level=uvicorn_LOGGING,
        reload=DEVELOPMENT
        )

'''
Note: The reload and workers parameters are mutually exclusive.
'''
