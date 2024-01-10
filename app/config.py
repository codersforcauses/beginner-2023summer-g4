# config.py

# Perth PinPoint Configuration

# Run Silently, with or without a Banner
SILENT = False ; BANNER = True

# Production
# Enabled, Disabled if "DEV" True

##### PROD OPTIONS #####
uvicorn_LOGGING = "error"
uvicorn_HOST = "0.0.0.0"
uvicorn_PORT = 5000
##### PROD OPTIONS #####

# Development
DEV = True
# WARNING: Please check the DEV_uvicorn_HOST/PORT, this is not reflected in the {pp_banner}!

##### DEV OPTIONS #####
DEV_DEBUG = True ; DEV_uvicorn_LOGGING = "trace" # uvicorn.config.LOGGING_CONFIG // 'critical', 'error', 'warning', 'info', 'debug', 'trace'
DEV_RELOAD = True
DEV_uvicorn_HOST = "127.0.0.1" ; DEV_uvicorn_PORT = 5000
#DEV_HEALTH = True #todo
DEV_DATABASE = True # rebuild database
##### DEV OPTIONS #####


