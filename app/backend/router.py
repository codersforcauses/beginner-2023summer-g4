# router.py

from fastapi import APIRouter

from core.constants import api_prefix
from backend.api import router as api

from core.constants import static_prefix
from backend.static import router as static

router = APIRouter()

router.include_router(static, prefix=static_prefix)
router.include_router(api, prefix=api_prefix)
