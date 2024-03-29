# init.py

import uvicorn ; import logging
from uvicorn.config import LOGGING_CONFIG

from config import *
from core.utils import *
from core.constants import *

if __name__ == "__main__":

    if DEV:
        print(f"[+] Development Mode Enabled")

        if DEV_DEBUG:
            print(f"[+] DEBUG: True, Debugging (log) enabled.")

        log(f"[+] Initialising Application")

        uvicorn_LOGGING = DEV_uvicorn_LOGGING ; uvicorn_HOST = DEV_uvicorn_HOST ; uvicorn_PORT = DEV_uvicorn_PORT ; uvicorn_WORKERS = DEV_WORKERS ; uvicorn_ACCESSLOG = DEV_ACCESSLOG
        # RELOAD = DEV_RELOAD
        
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
    
    # why is this not done by default
    LOGGING_CONFIG["formatters"]["default"]["fmt"] = "%(asctime)s [%(name)s] %(levelprefix)s %(message)s"
    
    uvicorn.run(
        "core.main:app",
        host=uvicorn_HOST,
        port=uvicorn_PORT,
        log_level=uvicorn_LOGGING,
        workers=uvicorn_WORKERS,
        log_config=LOGGING_CONFIG
        )

'''
Note: The reload and workers parameters are mutually exclusive.
'''
