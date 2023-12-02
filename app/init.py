# init.py

import uvicorn
from config import *
from core.utils import *

if __name__ == "__main__":

    if DEBUG:
        print(f"[+] DEBUG: True, Debugging (log) enabled.")

    log(f"[+] Initialising Application")
    
    uvicorn.run(
        "backend.main:app",
        host=uvicorn_HOST,
        port=uvicorn_PORT,
        log_level=uvicorn_LOGGING,
        reload=DEVELOPMENT
        )

'''
Note: The reload and workers parameters are mutually exclusive.
'''
