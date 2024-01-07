# init.py

import uvicorn
from config import *
from core.utils import *
from core.constants import *

if __name__ == "__main__":

    if DEV:
        print(f"[+] Development Mode Enabled")

        if DEV_DEBUG:
            print(f"[+] DEBUG: True, Debugging (log) enabled.")

        log(f"[+] Initialising Application")

        uvicorn_LOGGING = DEV_uvicorn_LOGGING ; RELOAD = DEV_RELOAD ; uvicorn_HOST = DEV_uvicorn_HOST ; uvicorn_PORT = DEV_uvicorn_PORT
        log(f"[+] Configured Development Options")

        if DEV_DATABASE:
            log(f"[+] Rebuilding Database")
            rebuild(path_db)

    if SILENT:
        uvicorn_LOGGING = "critical" # hehe not truely silent
    
    # inherit options automatically (prod config)
    RELOAD = False

    if BANNER:
        print(f"{pp_banner}")

    uvicorn.run(
        "core.main:app",
        host=uvicorn_HOST,
        port=uvicorn_PORT,
        log_level=uvicorn_LOGGING,
        reload=RELOAD
        )

'''
Note: The reload and workers parameters are mutually exclusive.
'''
